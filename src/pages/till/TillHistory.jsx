// pages/till/TillHistory.jsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTillHistory } from '../../hooks/useTillQueries';
import { useNavigate } from 'react-router-dom';
import {
  BsArrowLeft,
  BsCalendar,
  BsFilter,
  BsSearch,
  BsClockHistory,
  BsWallet2,
  BsArrowDownLeft,
  BsArrowUpRight,
  BsCashCoin,
  BsGraphUp,
} from 'react-icons/bs';
import { FiRefreshCw } from 'react-icons/fi';
import AfghanDatePicker from '../../components/common/AfghanDatePicker';
import { useDateFormatter } from '../../hooks/useDateFormatter';
import { formatNumber } from '../../utils/formatNumber';

const TillHistory = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { formatDisplay } = useDateFormatter();
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    search: '',
  });

  const [showFilters, setShowFilters] = useState(false);

  const { data: historyData, isLoading: historyLoading } =
    useTillHistory(filters);
  const history = historyData?.data || [];

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ startDate: '', endDate: '', search: '' });
  };

  const getStatusBadge = (status) => (
    <div className="flex items-center gap-1">
      <div
        className={`w-2 h-2 rounded-full ${
          status === 'open' ? 'bg-green-500 animate-pulse' : 'bg-gray-500'
        }`}
      ></div>
      <span
        className={`px-2 py-1.5 rounded-full text-sm font-semibold ${
          status === 'open'
            ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200'
            : 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border border-gray-200'
        }`}
      >
        {status.toUpperCase()}
      </span>
    </div>
  );

  const getDifferenceBadge = (difference) => {
    const diff = parseFloat(difference);
    if (diff === 0) {
      return (
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="px-3 py-1.5 rounded-full text-sm font-semibold bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200">
            {t('Perfect')}
          </span>
        </div>
      );
    } else if (diff > 0) {
      return (
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span className="px-3 py-1.5 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border border-blue-200">
            +${diff.toFixed(2)}
          </span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          <span className="px-3 py-1.5 rounded-full text-sm font-semibold bg-gradient-to-r from-red-100 to-rose-100 text-red-800 border border-red-200">
            -${Math.abs(diff).toFixed(2)}
          </span>
        </div>
      );
    }
  };

  const formatCurrency = (amount) => {
    return formatNumber(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white rounded-2xl shadow-lg border border-blue-100">
                <BsClockHistory className="text-2xl text-blue-600" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
                  {t('Till History')}
                </h1>
                <p className="text-gray-600 mt-2 text-lg">
                  {t('Historical cash till records and analytics')}
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate('/till/tillDashboard')}
              className="flex items-center gap-3 px-6 py-3 bg-white text-gray-700 rounded-xl shadow-lg hover:shadow-xl border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:-translate-y-0.5"
            >
              <BsArrowLeft className="text-lg text-blue-600" />
              <span className="font-semibold">{t('Back to Today')}</span>
            </button>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-3xl p-4 shadow-xl border border-gray-200/60 mb-6 backdrop-blur-sm">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 w-full lg:max-w-md">
              <BsSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="text"
                placeholder="Search by date or amount..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full pl-12 pr-4 py-2 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-gray-50/50"
              />
            </div>

            {/* Filter Toggle */}
            <div className="flex gap-3 w-full lg:w-auto">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-gray-500 to-slate-600 text-white rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                <BsFilter className="text-lg" />
                <span className="font-semibold">{t('Filters')}</span>
              </button>

              {(filters.startDate || filters.endDate || filters.search) && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <FiRefreshCw className="text-lg" />
                  <span className="font-semibold">Clear</span>
                </button>
              )}
            </div>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200 animate-slideDown">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <BsCalendar className="text-blue-600" />
                    {t('Start Date')}
                  </label>
                  <AfghanDatePicker
                    type="date"
                    value={filters.startDate}
                    onChange={(e) =>
                      handleFilterChange('startDate', e.target.value)
                    }
                    className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-gray-50/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <BsCalendar className="text-blue-600" />
                    {t('End Date')}
                  </label>
                  <AfghanDatePicker
                    type="date"
                    value={filters.endDate}
                    onChange={(e) =>
                      handleFilterChange('endDate', e.target.value)
                    }
                    className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-gray-50/50"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Stats Summary */}
        {history.length > 0 && !historyLoading && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl p-6 shadow-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                    {t('Total Days')}
                  </p>
                  <p className="text-2xl font-bold text-blue-800 mt-1">
                    {history.length}
                  </p>
                </div>
                <div className="p-3 bg-blue-500 rounded-2xl text-white">
                  <BsCalendar className="text-xl" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-6 shadow-lg border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-green-600 uppercase tracking-wide">
                    {t('Total Cash In')}
                  </p>
                  <p className="text-2xl font-bold text-green-800 mt-1">
                    $
                    {formatCurrency(
                      history.reduce(
                        (sum, till) => sum + parseFloat(till.totalIn),
                        0
                      )
                    )}
                  </p>
                </div>
                <div className="p-3 bg-green-500 rounded-2xl text-white">
                  <BsArrowDownLeft className="text-xl" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-3xl p-6 shadow-lg border border-red-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-red-600 uppercase tracking-wide">
                    {t('Total Cash Out')}
                  </p>
                  <p className="text-2xl font-bold text-red-800 mt-1">
                    $
                    {formatCurrency(
                      history.reduce(
                        (sum, till) => sum + parseFloat(till.totalOut),
                        0
                      )
                    )}
                  </p>
                </div>
                <div className="p-3 bg-red-500 rounded-2xl text-white">
                  <BsArrowUpRight className="text-xl" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-3xl p-6 shadow-lg border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-purple-600 uppercase tracking-wide">
                    {t('Perfect Days')}
                  </p>
                  <p className="text-2xl font-bold text-purple-800 mt-1">
                    {
                      history.filter(
                        (till) => parseFloat(till.difference) === 0
                      ).length
                    }
                  </p>
                </div>
                <div className="p-3 bg-purple-500 rounded-2xl text-white">
                  <BsGraphUp className="text-xl" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* History Table */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200/60 overflow-hidden backdrop-blur-sm">
          {historyLoading ? (
            <div className="flex flex-col items-center justify-center p-10">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mb-4"></div>
              <p className="text-gray-600 font-medium">
                {t('Loading historical data')}...
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-slate-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-bold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                      <div className="flex items-center gap-2">
                        <BsCalendar className="text-blue-600" />
                        {t('Date')}
                      </div>
                    </th>
                    <th className="px-4 py-2 text-center text-sm font-bold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                      <div className="flex items-center gap-2">
                        <BsWallet2 className="text-blue-600" />
                        {t('Opening')}
                      </div>
                    </th>
                    <th className="px-4 py-2 text-center text-sm font-bold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                      <div className="flex items-center gap-2">
                        <BsArrowDownLeft className="text-green-600" />
                        {t('Cash In')}
                      </div>
                    </th>
                    <th className="px-4 py-2 text-center text-sm font-bold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                      <div className="flex items-center gap-2">
                        <BsArrowUpRight className="text-red-600" />
                        {t('Cash Out')}
                      </div>
                    </th>
                    <th className="px-4 py-2 text-center text-sm font-bold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                      <div className="flex items-center gap-2">
                        <BsCashCoin className="text-purple-600" />
                        {t('Closing')}
                      </div>
                    </th>
                    <th className="px-4 py-2 text-center text-sm font-bold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                      {t('Difference')}
                    </th>
                    <th className="px-4 py-2 text-center text-sm font-bold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                      {t('Status')}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200/60">
                  {history.map((till, index) => (
                    <tr
                      key={till.id}
                      className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-cyan-50/50 transition-all duration-300 group"
                    >
                      <td className="px-4 py-5 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white font-bold text-sm">
                            {new Date(till.date).getDate()}
                          </div>
                          <div>
                            <div className="text-md font-bold text-gray-900 group-hover:text-blue-800 transition-colors">
                              {formatDisplay(till.date)}
                            </div>
                            <div className="text-sm text-gray-500">
                              {formatDisplay(till.date, { showTime: true })}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-6 whitespace-nowrap">
                        <div
                          dir="ltr"
                          className="text-sm font-bold text-gray-900"
                        >
                          ${formatCurrency(till.openingBalance)}
                        </div>
                      </td>
                      <td className="px-4 py-6 whitespace-nowrap">
                        <div className="text-sm font-bold text-green-600 bg-green-50 px-3 py-2 rounded-2xl border border-green-200">
                          ${formatCurrency(till.totalIn)}
                        </div>
                      </td>
                      <td className="px-4 py-6 whitespace-nowrap">
                        <div className="text-sm font-bold text-red-600 bg-red-50 px-3 py-2 rounded-2xl border border-red-200">
                          ${formatCurrency(till.totalOut)}
                        </div>
                      </td>
                      <td className="px-4 py-6 whitespace-nowrap">
                        <div
                          dir="ltr"
                          className="text-sm font-bold text-purple-600 bg-purple-50 px-3 py-2 rounded-2xl border border-purple-200"
                        >
                          ${formatCurrency(till.closingBalance)}
                        </div>
                      </td>
                      <td className="px-4 py-6 whitespace-nowrap">
                        {getDifferenceBadge(till.difference)}
                      </td>
                      <td className="px-4 py-6 whitespace-nowrap">
                        {getStatusBadge(till.status)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {history.length === 0 && (
                <div className="text-center py-16">
                  <div className="w-20 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <BsClockHistory className="text-3xl text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-600 mb-2">
                    {t('No Till Records Found')}
                  </h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    {filters.startDate || filters.endDate || filters.search
                      ? 'No records match your search criteria. Try adjusting your filters.'
                      : 'No historical till records available for the selected period.'}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Pagination or Load More would go here */}
        {history.length > 0 && (
          <div className="mt-8 flex justify-center">
            <div className="bg-white rounded-2xl px-6 py-3 shadow-lg border border-gray-200">
              <p className="text-gray-600 font-medium">
                Showing{' '}
                <span className="text-blue-600 font-bold">
                  {history.length}
                </span>{' '}
                records
              </p>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default TillHistory;
