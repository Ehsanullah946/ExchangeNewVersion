// pages/till/TillDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchTodayTill } from '../../store/slices/tillSlice';
import { useCloseTill } from '../../hooks/queries/useTillQueries';
import TillStats from '../../components/till/TillStats';
import CashFlowBreakdown from '../../components/till/CashFlowBreakdown';
import CloseTillModal from '../../components/till/CloseTillModal';
import { BsCashCoin, BsClockHistory } from 'react-icons/bs';

const TillDashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { todayTill, cashFlow, loading, error } = useSelector(
    (state) => state.till
  );
  const closeTillMutation = useCloseTill();

  const [showCloseModal, setShowCloseModal] = useState(false);

  useEffect(() => {
    dispatch(fetchTodayTill());
  }, [dispatch]);

  const handleCloseTill = async (closeData) => {
    try {
      await closeTillMutation.mutateAsync(closeData);
      setShowCloseModal(false);
      // Redux will automatically update via the mutation's invalidation
    } catch (error) {
      // Error handled by mutation
    }
  };

  if (loading && !todayTill) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
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
                {todayTill?.date
                  ? `Today: ${new Date(todayTill.date).toLocaleDateString()}`
                  : 'Loading...'}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => navigate('/till/history')}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <BsClockHistory />
                View History
              </button>

              {todayTill?.status === 'open' && (
                <button
                  onClick={() => setShowCloseModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <BsCashCoin />
                  Close Till
                </button>
              )}
            </div>
          </div>

          {/* Status Badge */}
          <div className="mt-4">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                todayTill?.status === 'open'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              Status: {todayTill?.status?.toUpperCase()}
            </span>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800">{error}</p>
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <TillStats />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cash Flow Breakdown */}
          <div className="lg:col-span-2">
            <CashFlowBreakdown cashFlow={cashFlow} />
          </div>

          {/* Quick Actions & Info */}
          <div className="space-y-6">
            {/* Today's Summary */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Today's Summary
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Net Flow:</span>
                  <span
                    className={`font-semibold ${
                      parseFloat(todayTill?.totalIn || 0) -
                        parseFloat(todayTill?.totalOut || 0) >=
                      0
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    $
                    {(
                      parseFloat(todayTill?.totalIn || 0) -
                      parseFloat(todayTill?.totalOut || 0)
                    ).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Transaction Count:</span>
                  <span className="font-semibold">
                    {(cashFlow?.deposits?.count || 0) +
                      (cashFlow?.withdrawals?.count || 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Updated:</span>
                  <span className="font-semibold">
                    {todayTill
                      ? new Date(todayTill.updatedAt).toLocaleTimeString()
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
