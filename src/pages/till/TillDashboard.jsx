// pages/till/TillDashboard.jsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import TillStats from '../../components/till/TillStats';
import CashFlowBreakdown from '../../components/till/CashFlowBreakdown';
import CloseTillModal from '../../components/till/CloseTillModal';
import CurrencySelector from '../../components/till/CurrencySelector';
import {
  BsCashCoin,
  BsClockHistory,
  BsInbox,
  BsGraphUp,
  BsCurrencyExchange,
} from 'react-icons/bs';
import {
  useCloseTill,
  useTodayTill,
  useMoneyTypes,
} from '../../hooks/useTillQueries';
import { useDateFormatter } from '../../hooks/useDateFormatter';
import { formatNumber } from '../../utils/formatNumber';

const TillDashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: todayTillData, isLoading, isError } = useTodayTill();
  const { data: moneyTypes = [] } = useMoneyTypes();
  const { formatDisplay } = useDateFormatter();

  console.log(todayTillData);

  const closeTillMutation = useCloseTill();
  const [showCloseModal, setShowCloseModal] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('all'); // 'all' or specific moneyTypeId

  // Handle multi-currency data structure
  const isMultiCurrency = Array.isArray(todayTillData?.tills);
  const selectedTill = isMultiCurrency
    ? selectedCurrency === 'all'
      ? null
      : todayTillData?.tills?.find(
          (till) => till.moneyTypeId == selectedCurrency
        )
    : todayTillData?.till;

  const allTills = isMultiCurrency
    ? todayTillData?.tills
    : [todayTillData?.till].filter(Boolean);
  const cashFlow = todayTillData?.cashFlow || {};

  const handleCloseTill = async (closeData) => {
    try {
      await closeTillMutation.mutateAsync(closeData);
      setShowCloseModal(false);
    } catch (error) {
      console.error('Failed to close till', error);
    }
  };

  // Calculate totals across all currencies if "all" is selected
  const getAggregatedTotals = () => {
    if (!allTills?.length)
      return { totalIn: 0, totalOut: 0, openingBalance: 0, closingBalance: 0 };

    return allTills.reduce(
      (acc, till) => ({
        totalIn: acc.totalIn + parseFloat(till.totalIn || 0),
        totalOut: acc.totalOut + parseFloat(till.totalOut || 0),
        openingBalance:
          acc.openingBalance + parseFloat(till.openingBalance || 0),
        closingBalance:
          acc.closingBalance + parseFloat(till.closingBalance || 0),
      }),
      { totalIn: 0, totalOut: 0, openingBalance: 0, closingBalance: 0 }
    );
  };

  const getTotalTransactionCount = () => {
    if (!cashFlow) return 0;

    let total = 0;

    if (selectedCurrency === 'all') {
      // Sum across all currencies
      Object.values(cashFlow).forEach((currencyFlow) => {
        if (currencyFlow && typeof currencyFlow === 'object') {
          const {
            deposits,
            withdrawals,
            receives,
            transfers,
            exchangeSales,
            exchangePurchases,
          } = currencyFlow;
          total +=
            (deposits?.count || 0) +
            (withdrawals?.count || 0) +
            (receives?.count || 0) +
            (transfers?.count || 0) +
            (exchangeSales?.count || 0) +
            (exchangePurchases?.count || 0);
        }
      });
    } else {
      // Single currency
      const currencyFlow = cashFlow[selectedCurrency] || cashFlow; // Fallback for single currency mode
      const {
        deposits,
        withdrawals,
        receives,
        transfers,
        exchangeSales,
        exchangePurchases,
      } = currencyFlow;
      total =
        (deposits?.count || 0) +
        (withdrawals?.count || 0) +
        (receives?.count || 0) +
        (transfers?.count || 0) +
        (exchangeSales?.count || 0) +
        (exchangePurchases?.count || 0);
    }

    return total;
  };

  const calculateNetFlow = () => {
    if (selectedCurrency === 'all') {
      const aggregated = getAggregatedTotals();
      return aggregated.totalIn - aggregated.totalOut;
    } else {
      if (cashFlow[selectedCurrency]?.summary) {
        return (
          cashFlow[selectedCurrency].summary.totalIn -
          cashFlow[selectedCurrency].summary.totalOut
        );
      }
      return (
        parseFloat(selectedTill?.totalIn || 0) -
        parseFloat(selectedTill?.totalOut || 0)
      );
    }
  };

  const getDisplayTill = () => {
    if (selectedCurrency === 'all') {
      return getAggregatedTotals();
    }
    return selectedTill;
  };

  const getCurrencyName = () => {
    if (selectedCurrency === 'all') return 'All Currencies';
    const moneyType = moneyTypes.find((mt) => mt.id == selectedCurrency);
    return moneyType?.typeName || 'Currency';
  };

  if (isLoading && !todayTillData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-gray-600 font-medium">Loading till data...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center text-center p-8">
          <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6 shadow-lg">
            <BsInbox className="text-5xl text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-700 mb-3">
            {t('No Till Data Found')}
          </h3>
          <p className="text-gray-500 max-w-md text-lg leading-relaxed">
            {t('Unable to load till data. Please try again later.')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-5">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-white rounded-2xl shadow-lg border border-blue-100">
                  <BsGraphUp className="text-2xl text-blue-600" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
                    {t('Cash Till Management')}
                  </h1>
                  <p className="text-gray-600 mt-2 text-lg">
                    {todayTillData?.tills?.[0]?.date ||
                    todayTillData?.till?.date
                      ? `${t('Today')}: ${formatDisplay(
                          todayTillData.tills?.[0]?.date ||
                            todayTillData.till.date
                        )}`
                      : 'Loading...'}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <BsCurrencyExchange className="text-gray-400" />
                    <span className="text-sm text-gray-500">
                      {getCurrencyName()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => navigate('/till/tillHistory')}
                className="flex items-center gap-3 px-6 py-2 bg-white text-gray-700 rounded-xl shadow-lg hover:shadow-xl border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:-translate-y-0.5"
              >
                <BsClockHistory className="text-md text-blue-600" />
                <span className="font-semibold">{t('View History')}</span>
              </button>

              {isMultiCurrency && moneyTypes.length > 0 && (
                <CurrencySelector
                  moneyTypes={moneyTypes}
                  selectedCurrency={selectedCurrency}
                  onCurrencyChange={setSelectedCurrency}
                />
              )}

              {selectedTill?.status === 'open' && (
                <button
                  onClick={() => setShowCloseModal(true)}
                  className="flex items-center gap-3 px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-green-500/25"
                >
                  <BsCashCoin className="text-md" />
                  <span className="font-semibold">{t('Close Till')}</span>
                </button>
              )}
            </div>
          </div>

          {/* Status Badge */}
          <div className="mt-3">
            {selectedCurrency !== 'all' && selectedTill && (
              <span
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold shadow-lg ${
                  selectedTill?.status === 'open'
                    ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200'
                    : 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border border-gray-200'
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full mr-2 ${
                    selectedTill?.status === 'open'
                      ? 'bg-green-500 animate-pulse'
                      : 'bg-gray-500'
                  }`}
                ></div>
                {t('Status')}: {t(selectedTill?.status?.toUpperCase())}
              </span>
            )}
            {selectedCurrency === 'all' && (
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold shadow-lg bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border border-blue-200">
                <BsCurrencyExchange className="w-3 h-3 mr-2" />
                {t('Multi-Currency View')}
              </span>
            )}
          </div>
        </div>

        {/* Stats */}
        <TillStats
          todayTill={getDisplayTill()}
          isMultiCurrency={selectedCurrency === 'all'}
          currencyName={getCurrencyName()}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CashFlowBreakdown
              cashFlow={
                selectedCurrency === 'all'
                  ? cashFlow
                  : cashFlow[selectedCurrency]
              }
              isMultiCurrency={selectedCurrency === 'all'}
            />
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-200/60 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <div className="w-2 h-6 bg-blue-500 rounded-full"></div>
                {selectedCurrency === 'all'
                  ? t('All Currencies Summary')
                  : t("Today's Summary")}
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                  <span className="text-gray-700 font-medium">
                    {t('Net Flow')}:
                  </span>
                  <span
                    className={`font-bold text-lg ${
                      calculateNetFlow() >= 0
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    ${formatNumber(calculateNetFlow())}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
                  <span className="text-gray-700 font-medium">
                    {t('Transaction Count')}:
                  </span>
                  <span className="font-bold text-lg text-purple-600">
                    {getTotalTransactionCount()}
                  </span>
                </div>
                {selectedCurrency !== 'all' && (
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl border border-gray-100">
                    <span className="text-gray-700 font-medium">
                      {t('Last Updated')}:
                    </span>
                    <span className="font-semibold text-gray-900">
                      {selectedTill?.updatedAt
                        ? new Date(selectedTill.updatedAt).toLocaleTimeString()
                        : selectedTill?.createdAt
                        ? new Date(selectedTill.createdAt).toLocaleTimeString()
                        : 'N/A'}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Currency Quick Stats */}
            {isMultiCurrency && allTills.length > 0 && (
              <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-200/60 backdrop-blur-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <BsCurrencyExchange className="text-blue-600" />
                  {t('Currency Overview')}
                </h3>
                <div className="space-y-3">
                  {allTills.map((till, index) => (
                    <div
                      key={till.id}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border border-gray-200"
                    >
                      <span className="text-sm font-medium text-gray-700">
                        {moneyTypes.find((mt) => mt.id === till.moneyTypeId)
                          ?.typeName || 'Unknown'}
                      </span>
                      <div className="flex gap-2">
                        <span className="text-sm text-green-600 font-semibold">
                          +${formatNumber(till.totalIn)}
                        </span>
                        <span className="text-sm text-red-600 font-semibold">
                          -${formatNumber(till.totalOut)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {selectedCurrency !== 'all' && selectedTill?.status === 'open' && (
          <CloseTillModal
            isOpen={showCloseModal}
            onClose={() => setShowCloseModal(false)}
            onCloseTill={handleCloseTill}
            loading={closeTillMutation.isPending}
            todayTill={selectedTill}
            moneyTypeId={selectedCurrency !== 'all' ? selectedCurrency : null}
            currencyName={getCurrencyName()}
          />
        )}
      </div>
    </div>
  );
};

export default TillDashboard;
