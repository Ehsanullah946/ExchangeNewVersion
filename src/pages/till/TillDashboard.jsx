// pages/till/TillDashboard.jsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import TillStats from '../../components/till/TillStats';
import CashFlowBreakdown from '../../components/till/CashFlowBreakdown';
import CloseTillModal from '../../components/till/CloseTillModal';
import { BsCashCoin, BsClockHistory, BsInbox } from 'react-icons/bs';
import { useCloseTill, useTodayTill } from '../../hooks/useTillQueries';
import { useDateFormatter } from '../../hooks/useDateFormatter';

const TillDashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: todayTill, isLoading, isError } = useTodayTill();
  const { formatDisplay } = useDateFormatter();

  const closeTillMutation = useCloseTill();
  const [showCloseModal, setShowCloseModal] = useState(false);

  console.log('🔍 Today Till Data:', todayTill);

  const handleCloseTill = async (closeData) => {
    try {
      await closeTillMutation.mutateAsync(closeData);
      setShowCloseModal(false);
    } catch (error) {
      console.error('Failed to close till', error);
    }
  };

  // ✅ FIXED: Calculate transaction count with correct property names
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

  // ✅ FIXED: Calculate net flow correctly
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4">
          <BsInbox className="text-4xl text-gray-400" />
        </div>
        <h3 className="text-xl font-bold text-gray-600 mb-2">
          {t('No Transaction found')}
        </h3>
        <p className="text-gray-500 max-w-md">
          {t('No records match criteria.')}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {t('Cash Till Management')}
              </h1>
              <p className="text-gray-600 mt-2">
                {todayTill?.till?.date
                  ? `${t('Today')}: ${formatDisplay(todayTill.till.date)}`
                  : 'Loading...'}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => navigate('/till/tillHistory')}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <BsClockHistory />
                {t('View History')}
              </button>

              {todayTill?.till?.status === 'open' && (
                <button
                  onClick={() => setShowCloseModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <BsCashCoin />
                  {t('Close Till')}
                </button>
              )}
            </div>
          </div>

          {/* Status Badge */}
          <div className="mt-4">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                todayTill?.till?.status === 'open'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {t('Status')}: {t(todayTill?.till?.status?.toUpperCase())}
            </span>
          </div>
        </div>

        {/* Stats */}
        <TillStats todayTill={todayTill?.till} />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {/* Pass the actual cashFlow data from API */}
            <CashFlowBreakdown cashFlow={todayTill?.cashFlow} />
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {t("Today's Summary")}
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('Net Flow')}:</span>
                  <span
                    className={`font-semibold ${
                      calculateNetFlow() >= 0
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    $
                    {calculateNetFlow().toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {t('Transaction Count')}:
                  </span>
                  <span className="font-semibold">
                    {getTotalTransactionCount()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('Last Updated')}:</span>
                  <span className="font-semibold">
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
