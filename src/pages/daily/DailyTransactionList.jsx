import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { formatNumber } from '../../utils/formatNumber';
import { BsPrinter, BsDownload, BsSearch, BsFilter } from 'react-icons/bs';
import { RiAddBoxFill } from 'react-icons/ri';

import { useDayBook } from '../../hooks/useDayBook';
import AfghanDatePicker from '../../components/common/AfghanDatePicker';
import { useDateFormatter } from '../../hooks/useDateFormatter';
import { BiMinus } from 'react-icons/bi';
import { MdToday } from 'react-icons/md';

const DailyTransactionList = () => {
  const { t } = useTranslation();
  const { formatDisplay } = useDateFormatter();
  const [filters, setFilters] = useState({
    date: new Date().toISOString().split('T')[0],
    startDate: '',
    endDate: '',
    viewMode: 'single', // 'single' or 'range'
    page: 1,
    limit: 20,
  });

  const { data, isLoading, error } = useDayBook(filters);

  const dayBookData = data?.data || {};
  const transactions = dayBookData.transactions || [];
  const summary = dayBookData.summary || {};
  const totalsByCurrency = dayBookData.totalsByCurrency || {};
  const pagination = dayBookData.pagination || {};

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1, // Reset to first page when filters change
    }));
  };

  const handleViewModeChange = (mode) => {
    setFilters((prev) => ({
      ...prev,
      viewMode: mode,
      date: mode === 'single' ? new Date().toISOString().split('T')[0] : '',
      startDate: mode === 'range' ? new Date().toISOString().split('T')[0] : '',
      endDate: mode === 'range' ? new Date().toISOString().split('T')[0] : '',
      page: 1,
    }));
  };

  const getTransactionDescription = (transaction) => {
    switch (transaction.type) {
      case 'deposit':
        return t('Deposit transaction');
      case 'withdraw':
        return t('Withdrawal transaction');
      case 'transfer':
        return t('Send');
      case 'receive':
        return t('Receive');
      case 'exchange':
        return t('Currency exchange');

      default:
        return 'Transaction';
    }
  };

  const handleExport = () => {
    console.log('Exporting day book data...');
  };

  const handlePrint = () => {
    window.print();
  };

  const getTransactionTypeColor = (type) => {
    const colors = {
      deposit: 'bg-green-100 text-green-800 border-green-200',
      withdraw: 'bg-red-100 text-red-800 border-red-200',
      receive: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      transfer: 'bg-blue-100 text-blue-800 border-blue-200',
      exchange: 'bg-purple-100 text-purple-800 border-purple-200',
    };
    return colors[type] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getTransactionTypeIcon = (type) => {
    const icons = {
      deposit: <RiAddBoxFill className="text-green-500" />,
      withdraw: <RiAddBoxFill className="text-red-500" />,
      receive: <RiAddBoxFill className="text-yellow-500" />,
      transfer: <RiAddBoxFill className="text-blue-500" />,
      exchange: <RiAddBoxFill className="text-purple-500" />,
    };
    return icons[type] || <RiAddBoxFill className="text-gray-500" />;
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
            <h3 className="text-lg font-semibold text-red-800 mb-2">
              {t('Error Loading Day Book')}
            </h3>
            <p className="text-red-600">{error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col p-4 lg:flex-row rounded-2xl bg-gradient-to-r from-blue-600 rounded-t-2xl via-purple-600 to-indigo-700 justify-between items-start lg:items-center gap-4 mb-2">
          <div>
            <div className="flex items-center gap-2 text-white ">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <MdToday className="text-xl" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-white">
                {t('Day Book')}
              </h1>
            </div>
            <p className="text-white">
              {t('Complete transaction overview for selected period')}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-gray-600 to-slate-700 hover:from-gray-700 hover:to-slate-800 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 text-sm"
            >
              <BsPrinter className="text-base" />
              <span>{t('Print')}</span>
            </button>

            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 text-sm"
            >
              <BsDownload className="text-base" />
              <span>{t('Export')}</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-end">
            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => handleViewModeChange('single')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filters.viewMode === 'single'
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {t('Single Day')}
              </button>
              <button
                onClick={() => handleViewModeChange('range')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filters.viewMode === 'range'
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {t('Date Range')}
              </button>
            </div>

            {/* Date Inputs */}
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {filters.viewMode === 'single' ? (
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('Date')}
                  </label>
                  <AfghanDatePicker
                    type="date"
                    value={filters.date}
                    onChange={(e) => handleFilterChange('date', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              ) : (
                <>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('Start Date')}
                    </label>
                    <AfghanDatePicker
                      type="date"
                      value={filters.startDate}
                      onChange={(e) =>
                        handleFilterChange('startDate', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('End Date')}
                    </label>
                    <AfghanDatePicker
                      type="date"
                      value={filters.endDate}
                      onChange={(e) =>
                        handleFilterChange('endDate', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Search and Limit */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('Rows per page')}
                </label>
                <select
                  value={filters.limit}
                  onChange={(e) =>
                    handleFilterChange('limit', parseInt(e.target.value))
                  }
                  className="px-4 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value={15}>15</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                  <option value={200}>200</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        {!isLoading && transactions.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Total Transactions */}
            <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl p-4 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">
                    {t('Total Transactions')}
                  </p>
                  <p className="text-2xl font-bold">
                    {summary.totalTransactions}
                  </p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <BsFilter className="text-xl" />
                </div>
              </div>
            </div>

            {/* Total Debit */}
            <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl p-4 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">{t('Total Debit')}</p>
                  <p className="text-2xl font-bold">
                    {formatNumber(summary.totalDebit)?.toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <BiMinus className="text-xl" />
                </div>
              </div>
            </div>

            {/* Total Credit */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-4 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">{t('Total Credit')}</p>
                  <p className="text-2xl font-bold">
                    {formatNumber(summary.totalCredit)?.toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <RiAddBoxFill className="text-xl" />
                </div>
              </div>
            </div>

            {/* Net Balance */}
            <div
              className={`rounded-2xl p-4 text-white shadow-lg ${
                summary.netBalance >= 0
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600'
                  : 'bg-gradient-to-r from-red-500 to-pink-600'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">{t('Net Balance')}</p>
                  <p dir="ltr" className="text-2xl font-bold">
                    {formatNumber(summary.netBalance)?.toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  {summary.netBalance >= 0 ? (
                    <RiAddBoxFill className="text-xl" />
                  ) : (
                    <BiMinus className="text-lg font-extrabold" />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Currency Totals */}
        {!isLoading && Object.keys(totalsByCurrency).length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t('Currency-wise Summary')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(totalsByCurrency).map(([currency, totals]) => (
                <div
                  key={currency}
                  className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-800">
                      {currency}
                    </span>
                    <span
                      dir="ltr"
                      className={`text-sm px-2 py-1 rounded-full ${
                        totals.balance >= 0
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {formatNumber(totals.balance)?.toLocaleString()}
                    </span>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>{t('Debit')}:</span>
                      <span className="text-red-600 font-medium">
                        {formatNumber(totals.totalDebit)?.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('Credit')}:</span>
                      <span className="text-green-600 font-medium">
                        {formatNumber(totals.totalCredit)?.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="relative">
                  <div className="w-12 h-12 border-4 border-blue-200 rounded-full animate-spin"></div>
                  <div className="w-12 h-12 border-4 border-transparent border-t-blue-500 rounded-full animate-spin absolute top-0 left-0"></div>
                </div>
                <p className="mt-4 text-gray-600 font-medium">
                  {t('Loading day book...')}
                </p>
              </div>
            </div>
          ) : transactions.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <div className="flex flex-col items-center justify-center">
                <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4">
                  <BsSearch className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-600 mb-2">
                  {t('No transactions found')}
                </h3>
                <p className="text-gray-500 max-w-md text-center">
                  {t(
                    'No transactions match your selected criteria. Try adjusting your date range.'
                  )}
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Transactions Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-800 to-slate-900">
                    <tr>
                      <th className="px-4 py-3 text-center text-white font-semibold text-xs uppercase tracking-wider">
                        {t('Transaction')}
                      </th>
                      <th className="px-4 py-3 text-center text-white font-semibold text-xs uppercase tracking-wider">
                        {t('Customer')}
                      </th>
                      <th className="px-4 py-3 text-center text-white font-semibold text-xs uppercase tracking-wider">
                        {t('Details')}
                      </th>
                      <th className="px-4 py-3 text-center text-white font-semibold text-xs uppercase tracking-wider">
                        {t('Debit')}
                      </th>
                      <th className="px-4 py-3 text-center text-white font-semibold text-xs uppercase tracking-wider">
                        {t('Credit')}
                      </th>
                      <th className="px-4 py-3 text-center text-white font-semibold text-xs uppercase tracking-wider">
                        {t('Currency')}
                      </th>
                      <th className="px-4 py-3 text-center text-white font-semibold text-xs uppercase tracking-wider">
                        {t('Type')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {transactions.map((transaction, index) => (
                      <tr
                        key={`${transaction.id}-${index}`}
                        className="group hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-indigo-50/20 transition-all duration-200"
                      >
                        {/* Transaction ID & Date */}
                        <td className="px-4 py-3">
                          <div className="flex flex-col">
                            <span className="font-mono text-sm font-semibold text-gray-700">
                              {transaction.transactionId}
                            </span>
                            <span className="text-xs text-gray-500">
                              {formatDisplay(transaction.date, {
                                showTime: true,
                              })}{' '}
                            </span>
                          </div>
                        </td>

                        {/* Customer */}
                        <td className="px-4 py-3">
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-800">
                              {transaction.customerName}
                            </span>
                            {transaction.accountNo && (
                              <span className="text-xs text-gray-500">
                                Acc: {transaction.accountNo}
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Details */}
                        <td className="px-4 py-3">
                          <div className="max-w-xs">
                            <p className="text-sm text-gray-800 truncate">
                              {transaction.description ||
                                getTransactionDescription(transaction)}
                            </p>
                            {transaction.senderName &&
                              transaction.receiverName && (
                                <p className="text-xs text-gray-500 mt-1">
                                  {transaction.senderName} →{' '}
                                  {transaction.receiverName}
                                </p>
                              )}
                          </div>
                        </td>

                        {/* Debit */}
                        <td className="px-4 py-3 text-right">
                          {transaction.debit > 0 && (
                            <div className="flex items-center justify-end gap-1">
                              <BiMinus className="text-red-500 text-lg" />
                              <span className="text-red-600 font-bold text-sm">
                                {formatNumber(
                                  transaction.debit
                                )?.toLocaleString()}
                              </span>
                            </div>
                          )}
                        </td>

                        {/* Credit */}
                        <td className="px-4 py-3 text-right">
                          {transaction.credit > 0 && (
                            <div className="flex items-center justify-end gap-1">
                              <RiAddBoxFill className="text-green-500 text-xs" />
                              <span className="text-green-600 font-bold text-sm">
                                {formatNumber(
                                  transaction.credit
                                )?.toLocaleString()}
                              </span>
                            </div>
                          )}
                        </td>

                        {/* Currency */}
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                            {transaction.currency}
                          </span>
                        </td>

                        {/* Type */}
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${getTransactionTypeColor(
                              transaction.type
                            )}`}
                          >
                            {getTransactionTypeIcon(transaction.type)}
                            {t(transaction.type)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Results Info */}
                    <div className="text-sm text-gray-600 font-medium">
                      {t('Showing')}{' '}
                      <span className="font-bold text-gray-800">
                        {(filters.page - 1) * filters.limit + 1}
                      </span>{' '}
                      -{' '}
                      <span className="font-bold text-gray-800">
                        {Math.min(
                          filters.page * filters.limit,
                          pagination.total
                        )}
                      </span>{' '}
                      {t('of')}{' '}
                      <span className="font-bold text-gray-800">
                        {pagination.total}
                      </span>{' '}
                      {t('results')}
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex items-center gap-2">
                      {/* Previous Button */}
                      <button
                        onClick={() =>
                          handleFilterChange(
                            'page',
                            Math.max(filters.page - 1, 1)
                          )
                        }
                        disabled={filters.page === 1}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 text-sm ${
                          filters.page === 1
                            ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                            : 'text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:shadow-lg'
                        }`}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                        {t('Prev')}
                      </button>

                      {/* Page Numbers */}
                      <div className="flex items-center gap-1">
                        {Array.from(
                          { length: pagination.totalPages },
                          (_, i) => i + 1
                        )
                          .filter(
                            (pageNum) =>
                              pageNum === 1 ||
                              pageNum === pagination.totalPages ||
                              Math.abs(pageNum - filters.page) <= 2
                          )
                          .map((pageNum, index, array) => {
                            const showEllipsis =
                              index < array.length - 1 &&
                              array[index + 1] - pageNum > 1;

                            return (
                              <div key={pageNum} className="flex items-center">
                                <button
                                  onClick={() =>
                                    handleFilterChange('page', pageNum)
                                  }
                                  className={`min-w-8 h-8 flex items-center justify-center rounded-lg font-medium transition-all duration-200 text-sm ${
                                    filters.page === pageNum
                                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg scale-105'
                                      : 'text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:shadow-lg'
                                  }`}
                                >
                                  {pageNum}
                                </button>
                                {showEllipsis && (
                                  <span className="mx-1 text-gray-400">
                                    ...
                                  </span>
                                )}
                              </div>
                            );
                          })}
                      </div>

                      {/* Next Button */}
                      <button
                        onClick={() =>
                          handleFilterChange(
                            'page',
                            Math.min(filters.page + 1, pagination.totalPages)
                          )
                        }
                        disabled={filters.page === pagination.totalPages}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 text-sm ${
                          filters.page === pagination.totalPages
                            ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                            : 'text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:shadow-lg'
                        }`}
                      >
                        {t('Next')}
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyTransactionList;
