// pages/till/TillDashboard.jsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import TillStats from '../../components/till/TillStats';
import CashFlowBreakdown from '../../components/till/CashFlowBreakdown';
import CloseTillModal from '../../components/till/CloseTillModal';
import { BsCashCoin, BsClockHistory, BsInbox, BsGraphUp } from 'react-icons/bs';
import { useCloseTill, useTodayTill } from '../../hooks/useTillQueries';
import { useDateFormatter } from '../../hooks/useDateFormatter';
import { formatNumber } from '../../utils/formatNumber';

const TillDashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: todayTill, isLoading, isError } = useTodayTill();
  const { formatDisplay } = useDateFormatter();

  const closeTillMutation = useCloseTill();
  const [showCloseModal, setShowCloseModal] = useState(false);

  const handleCloseTill = async (closeData) => {
    try {
      await closeTillMutation.mutateAsync(closeData);
      setShowCloseModal(false);
    } catch (error) {
      console.error('Failed to close till', error);
    }
  };

  const getTotalTransactionCount = () => {
    if (!todayTill?.cashFlow) return 0;

    const {
      deposits,
      withdrawals,
      receives,
      transfers,
      exchangeSales,
      exchangePurchases,
    } = todayTill.cashFlow;

    return (
      (deposits?.count || 0) +
      (withdrawals?.count || 0) +
      (receives?.count || 0) +
      (transfers?.count || 0) +
      (exchangeSales?.count || 0) +
      (exchangePurchases?.count || 0)
    );
  };

  const calculateNetFlow = () => {
    if (!todayTill?.cashFlow?.summary) {
      return (
        parseFloat(todayTill?.till?.totalIn || 0) -
        parseFloat(todayTill?.till?.totalOut || 0)
      );
    }

    return (
      todayTill.cashFlow.summary.totalIn - todayTill.cashFlow.summary.totalOut
    );
  };

  if (isLoading && !todayTill) {
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
            {t('No Transaction found')}
          </h3>
          <p className="text-gray-500 max-w-md text-lg leading-relaxed">
            {t('No records match criteria.')}
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
                    {todayTill?.till?.date
                      ? `${t('Today')}: ${formatDisplay(todayTill.till.date)}`
                      : 'Loading...'}
                  </p>
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

              {todayTill?.till?.status === 'open' && (
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
            <span
              className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold shadow-lg ${
                todayTill?.till?.status === 'open'
                  ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200'
                  : 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border border-gray-200'
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full mr-2 ${
                  todayTill?.till?.status === 'open'
                    ? 'bg-green-500 animate-pulse'
                    : 'bg-gray-500'
                }`}
              ></div>
              {t('Status')}: {t(todayTill?.till?.status?.toUpperCase())}
            </span>
          </div>
        </div>

        {/* Stats */}
        <TillStats todayTill={todayTill?.till} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CashFlowBreakdown cashFlow={todayTill?.cashFlow} />
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-200/60 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <div className="w-2 h-6 bg-blue-500 rounded-full"></div>
                {t("Today's Summary")}
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
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl border border-gray-100">
                  <span className="text-gray-700 font-medium">
                    {t('Last Updated')}:
                  </span>
                  <span className="font-semibold text-gray-900">
                    {todayTill?.till?.updatedAt
                      ? new Date(todayTill.till.updatedAt).toLocaleTimeString()
                      : todayTill?.till?.createdAt
                      ? new Date(todayTill.till.createdAt).toLocaleTimeString()
                      : 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Close Till Modal */}
        <CloseTillModal
          isOpen={showCloseModal}
          onClose={() => setShowCloseModal(false)}
          onCloseTill={handleCloseTill}
          loading={closeTillMutation.isPending}
          todayTill={todayTill}
        />
      </div>
    </div>
  );
};

export default TillDashboard;
