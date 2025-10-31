import React, { useEffect } from 'react';
import { BiSolidEdit } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import {
  BsCalendar,
  BsCashCoin,
  BsChevronLeft,
  BsChevronRight,
  BsCurrencyDollar,
  BsFilter,
  BsHash,
  BsInbox,
  BsPerson,
  BsPrinter,
  BsSearch,
  BsTrash,
  BsX,
} from 'react-icons/bs';
import { PulseLoader } from 'react-spinners';
import { FaMoneyBillWave } from 'react-icons/fa';
import {
  setDebouncedSearch,
  setSearch,
  setPage,
  toggleOpen,
  setMoneyType,
  setFromDate,
  setToDate,
} from '../../../features/ui/filterSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  useDeleteDepositWithdraw,
  useDeposit,
} from '../../../hooks/useDeposit';
import { formatNumber } from '../../../utils/formatNumber';
import { useDateFormatter } from '../../../hooks/useDateFormatter';
import { generateCompactDepositPrintHTML } from '../../../utils/printUtils';
import { useFlexiblePrint } from '../../../hooks/useFlexiblePrint';
import AfghanDatePicker from '../../../components/common/AfghanDatePicker';
import { useMoneyType } from '../../../hooks/useMoneyType';
const DepositList = () => {
  const { t } = useTranslation();
  const { formatDisplay, currentCalendar } = useDateFormatter();
  const {
    open,
    search,
    limit,
    page,
    debouncedSearch,
    moneyType,
    fromDate,
    toDate,
  } = useSelector((state) => state.filters);

  const dispatch = useDispatch();

  const { data: moneyTypeResponse } = useMoneyType();
  const moneyTypeOptions = (moneyTypeResponse?.data || []).map((c) => ({
    value: c.typeName,
    label: c.typeName,
  }));

  useEffect(() => {
    const handler = setTimeout(() => dispatch(setDebouncedSearch(search)), 500);
    return () => clearTimeout(handler);
  }, [search, dispatch]);

  useEffect(() => {
    dispatch(setPage(1));
  }, [debouncedSearch, moneyType, fromDate, toDate, dispatch]);

  const { data, isLoading } = useDeposit(
    debouncedSearch,
    moneyType,
    fromDate,
    toDate,
    limit,
    page
  );

  const deposit = data?.data || [];
  const total = data?.total || 0;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  useEffect(() => {
    if (total > 0 && page > totalPages) {
      dispatch(setPage(totalPages));
    }
    if (total === 0 && page !== 1) {
      dispatch(setPage(1));
    }
  }, [total, totalPages, page, dispatch]);

  const navigate = useNavigate();
  const deleteMutation = useDeleteDepositWithdraw();
  const { printContent } = useFlexiblePrint();

  const handleEdit = (id) => {
    navigate(`/main/deposit/${id}/edit`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this deposit?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleprint = (depositData) => {
    const printHTML = generateCompactDepositPrintHTML(
      depositData,
      t,
      formatDisplay
    );
    const title = `Deposit_Receipt_${depositData.No}`;
    printContent(printHTML, {
      title: title,
      paperSize: '80mm',
      orientation: 'portrait',
    });
  };

  const clearFilters = () => {
    dispatch(setSearch(''));
    dispatch(setMoneyType(''));
    dispatch(setFromDate(''));
    dispatch(setToDate(''));
  };

  const hasActiveFilters = search || moneyType || fromDate || toDate;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 py-3 px-2">
      <div className="max-w-7xl mx-auto">
        {/* Header Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-2 p-1 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
          <div className="flex flex-wrap items-center gap-3">
            <Link to="/main/deposit">
              <button className="flex items-center gap-2 px-2 py-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-110">
                <FaMoneyBillWave className="mt-1" />
                <span>{t('deposit')}</span>
              </button>
            </Link>

            <button
              onClick={() => dispatch(toggleOpen(!open))}
              className="flex items-center gap-2 px-2 py-1 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-110"
            >
              <BsFilter className="mt-1" />
              <span>{t('Filters')}</span>
            </button>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 px-2 py-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-110"
              >
                <BsX className="mt-1" />
                <span>{t('Clear Filters')}</span>
              </button>
            )}
          </div>

          {/* Search Bar */}
          <div className="relative group z-40000">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
            <div className="relative flex items-center bg-white rounded-xl shadow-lg border border-gray-100 pl-4 pr-2 py-2 min-w-80">
              <BsSearch className="text-gray-400 mr-3 flex-shrink-0" />
              <input
                type="text"
                placeholder={t('Search By Name')}
                value={search}
                onChange={(e) => dispatch(setSearch(e.target.value))}
                className="w-full bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 font-medium tracking-wide"
              />
              {search && (
                <button
                  onClick={() => dispatch(setSearch(''))}
                  className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <BsX className="text-xl" />
                </button>
              )}
            </div>
          </div>
        </div>
        {open && (
          <div className="mb-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 transition-all duration-300">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <BsCashCoin className="text-blue-500" />
                  {t('Currency')}
                </label>
                <select
                  value={moneyType}
                  onChange={(e) => dispatch(setMoneyType(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm transition-all duration-200"
                >
                  <option value="">{t('All Currency')}</option>
                  {moneyTypeOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* From Date Filter */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <BsCalendar className="text-green-500" />
                  {t('From Date')}
                </label>
                <AfghanDatePicker
                  type="date"
                  value={fromDate}
                  onChange={(e) => dispatch(setFromDate(e.target.value))}
                  className="w-full px-3 py-2 border z-3000 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white shadow-sm transition-all duration-200"
                />
              </div>

              {/* To Date Filter */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <BsCalendar className="text-red-500" />
                  {t('To Date')}
                </label>
                <AfghanDatePicker
                  type="date"
                  value={toDate}
                  onChange={(e) => dispatch(setToDate(e.target.value))}
                  className="w-full px-3 py-2 border z-3000 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white shadow-sm transition-all duration-200"
                />
              </div>
            </div>
            {/* Quick Date Presets */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t('Quick Date Filters')}
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    const today = new Date().toISOString().split('T')[0];
                    dispatch(setFromDate(today));
                    dispatch(setToDate(today));
                  }}
                  className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-200 transition-colors duration-200"
                >
                  {t('Today')}
                </button>
                <button
                  onClick={() => {
                    const today = new Date();
                    const weekAgo = new Date(today);
                    weekAgo.setDate(today.getDate() - 7);
                    dispatch(setFromDate(weekAgo.toISOString().split('T')[0]));
                    dispatch(setToDate(today.toISOString().split('T')[0]));
                  }}
                  className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-lg hover:bg-green-200 transition-colors duration-200"
                >
                  {t('Last 7 Days')}
                </button>
                <button
                  onClick={() => {
                    const today = new Date();
                    const monthAgo = new Date(today);
                    monthAgo.setDate(today.getDate() - 30);
                    dispatch(setFromDate(monthAgo.toISOString().split('T')[0]));
                    dispatch(setToDate(today.toISOString().split('T')[0]));
                  }}
                  className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded-lg hover:bg-purple-200 transition-colors duration-200"
                >
                  {t('Last 30 Days')}
                </button>
                <button
                  onClick={() => {
                    const today = new Date();
                    const yearStart = new Date(today.getFullYear(), 0, 1);
                    dispatch(
                      setFromDate(yearStart.toISOString().split('T')[0])
                    );
                    dispatch(setToDate(today.toISOString().split('T')[0]));
                  }}
                  className="px-3 py-1 bg-orange-100 text-orange-700 text-sm font-medium rounded-lg hover:bg-orange-200 transition-colors duration-200"
                >
                  {t('This Year')}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Table Container */}
          <div className="relative overflow-hidden">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="text-center">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin"></div>
                    <div className="w-16 h-16 border-4 ml-2 border-transparent border-t-blue-500 rounded-full animate-spin absolute top-0 left-0"></div>
                  </div>
                  <p className="mt-4  text-gray-600 font-medium">
                    <PulseLoader
                      color="green"
                      size={15}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                    {t('Loading...')}
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    {/* Table Header */}
                    <thead className="bg-gradient-to-r from-gray-800 to-slate-900">
                      <tr>
                        <th className="px-4 py-4 text-center text-white font-semibold text-sm uppercase tracking-wider">
                          <div className="flex items-center gap-2">
                            <BsHash className="text-gray-400" />
                            {t('Number')}
                          </div>
                        </th>
                        <th className="px-2 py-4 text-center text-white font-semibold text-sm uppercase tracking-wider">
                          <div className="flex items-center gap-2">
                            <BsPerson className="text-gray-400" />
                            {t('Customer')}
                          </div>
                        </th>
                        <th className="px-2 py-4 text-center text-white font-semibold text-sm uppercase tracking-wider">
                          <div className="flex items-center gap-2">
                            <BsCurrencyDollar className="text-gray-400" />
                            {t('Amount')}
                          </div>
                        </th>
                        <th className="px-2 py-4 text-center text-white font-semibold text-sm uppercase tracking-wider">
                          {t('Currency')}
                        </th>
                        <th className="px-2 py-4 text-center text-white font-semibold text-sm uppercase tracking-wider">
                          {t('Description')}
                        </th>
                        <th className="px-2 py-4 text-center text-white font-semibold text-sm uppercase tracking-wider">
                          <div className="flex items-center gap-2">
                            <BsCalendar className="text-gray-400" />
                            {t('Date')}
                          </div>
                        </th>
                        <th className="px-2 py-4 text-center text-white font-semibold text-sm uppercase tracking-wider">
                          {t('Actions')}
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                      {deposit.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="px-6 py-16 text-center">
                            <div className="flex flex-col items-center justify-center">
                              <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4">
                                <BsInbox className="text-4xl text-gray-400" />
                              </div>
                              <h3 className="text-xl font-bold text-gray-600 mb-2">
                                {hasActiveFilters
                                  ? t('No Transaction found for your search')
                                  : t('No transactions found')}
                              </h3>
                              <p className="text-gray-500 max-w-md">
                                {hasActiveFilters
                                  ? t(
                                      'No deposit records match your filter criteria. Try adjusting your filters.'
                                    )
                                  : t(
                                      'No deposit records found. Create a new deposit transaction to get started.'
                                    )}
                              </p>
                              {hasActiveFilters && (
                                <button
                                  onClick={clearFilters}
                                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                  {t('Clear Filters')}
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ) : (
                        deposit.map((c, index) => (
                          <tr
                            key={c.No}
                            className="group hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/30 transition-all duration-200 border-b border-gray-100 last:border-b-0"
                          >
                            <td className="px-2 py-1">
                              <div className="flex items-center gap-2">
                                <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                                  {index + 1}
                                </div>
                                <span className="font-semibold text-gray-700">
                                  #{c.No}
                                </span>
                              </div>
                            </td>

                            <td className="px-1 py-1">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                  {c.Account?.Customer?.Stakeholder?.Person?.firstName?.charAt(
                                    0
                                  ) || 'U'}
                                </div>
                                <div>
                                  <p className="font-semibold text-gray-800">
                                    {c.Account?.Customer?.Stakeholder?.Person
                                      ?.firstName || 'Unknown'}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    {t('Customer')}
                                  </p>
                                </div>
                              </div>
                            </td>

                            <td className="px-2 py-2">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-md">
                                  {formatNumber(c.deposit)}
                                </span>
                              </div>
                            </td>

                            <td className="px-2 py-1">
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200">
                                {c.Account?.MoneyType?.typeName || 'N/A'}
                              </span>
                            </td>

                            <td className="px-2 py-1 max-w-xs">
                              <p className="text-gray-600 ">{c.description}</p>
                            </td>

                            <td className="px-2 py-1">
                              <div className="flex flex-col">
                                <span className="font-semibold text-gray-800">
                                  {formatDisplay(c.DWDate, { showTime: true })}
                                </span>
                              </div>
                            </td>

                            {/* Action Buttons */}
                            <td className="px-2 py-1">
                              <div className="flex items-center justify-center gap-3">
                                {/* Print Button */}
                                <button
                                  onClick={() => handleprint(c)}
                                  className="p-2 bg-gradient-to-br from-amber-500 to-orange-500 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 group"
                                >
                                  <BsPrinter className="text-md" />
                                  <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs py-1 px-2 rounded-lg">
                                    {t('Print')}
                                  </div>
                                </button>

                                {/* Edit Button */}
                                <button
                                  onClick={() => handleEdit(c.No)}
                                  className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 group"
                                >
                                  <BiSolidEdit className="text-md" />
                                  <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs py-1 px-2 rounded-lg">
                                    {t('Edit')}
                                  </div>
                                </button>

                                {/* Delete Button */}
                                <button
                                  onClick={() => handleDelete(c.No)}
                                  disabled={deleteMutation.isLoading}
                                  className="p-2 bg-gradient-to-br from-red-500 to-pink-500 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group"
                                >
                                  {deleteMutation.isLoading ? (
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                  ) : (
                                    <BsTrash className="text-md" />
                                  )}
                                  <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs py-1 px-2 rounded-lg">
                                    {t('Delete')}
                                  </div>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {deposit.length > 0 && (
                  <div className="px-6 py-2 border-t border-gray-100 bg-gray-50/50">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                      {/* Results Info */}
                      <div className="text-sm text-gray-600 font-medium">
                        {t('Showing')}{' '}
                        <span className="font-bold text-gray-800">
                          {(page - 1) * limit + 1}
                        </span>{' '}
                        -{' '}
                        <span className="font-bold text-gray-800">
                          {Math.min(page * limit, total)}
                        </span>{' '}
                        {t('of')}{' '}
                        <span className="font-bold text-gray-800">{total}</span>{' '}
                        {t('results')}
                      </div>

                      {/* Pagination Controls */}
                      <div className="flex items-center gap-2">
                        {/* Previous Button */}
                        <button
                          onClick={() =>
                            dispatch(setPage(Math.max(page - 1, 1)))
                          }
                          disabled={page === 1}
                          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                            page === 1
                              ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                              : 'text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:shadow-lg'
                          }`}
                        >
                          <BsChevronLeft />
                          {t('Prev')}
                        </button>

                        {/* Page Numbers */}
                        <div className="flex items-center gap-1">
                          {Array.from(
                            { length: Math.ceil(total / limit) },
                            (_, i) => i + 1
                          )
                            .filter(
                              (pageNum) =>
                                pageNum === 1 ||
                                pageNum === Math.ceil(total / limit) ||
                                Math.abs(pageNum - page) <= 2
                            )
                            .map((pageNum, index, array) => {
                              const showEllipsis =
                                index < array.length - 1 &&
                                array[index + 1] - pageNum > 1;

                              return (
                                <div
                                  key={pageNum}
                                  className="flex items-center"
                                >
                                  <button
                                    onClick={() => dispatch(setPage(pageNum))}
                                    className={`min-w-10 h-10 flex items-center justify-center rounded-xl font-medium transition-all duration-200 ${
                                      page === pageNum
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
                            dispatch(
                              setPage(
                                Math.min(page + 1, Math.ceil(total / limit))
                              )
                            )
                          }
                          disabled={page === Math.ceil(total / limit)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                            page === Math.ceil(total / limit)
                              ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                              : 'text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:shadow-lg'
                          }`}
                        >
                          {t('Next')}
                          <BsChevronRight />
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
    </div>
  );
};

export default DepositList;
