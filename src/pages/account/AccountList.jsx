import React, { useEffect, useState } from 'react';
import { BiSolidEdit, BiSolidUserAccount } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';
import Button from '../../components/layout/Button';
import { Link, useNavigate } from 'react-router-dom';
import { BsArrowLeftRight, BsPrinter, BsSearch, BsShare } from 'react-icons/bs';
import { PulseLoader } from 'react-spinners';
import {
  setDebouncedSearch,
  setPage,
  setSearch,
} from '../../features/ui/filterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useAccount, useDeleteAccount } from '../../hooks/useAccount';
import { formatNumber } from '../../utils/formatNumber';
const AccountList = () => {
  const { t } = useTranslation();

  const { page, limit, search, debouncedSearch } = useSelector(
    (state) => state.filters
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const handler = setTimeout(() => dispatch(setDebouncedSearch(search)), 500);
    return () => clearTimeout(handler);
  }, [search, dispatch]);

  useEffect(() => {
    dispatch(setPage(1));
  }, [debouncedSearch, dispatch]);

  const { data, isLoading, error } = useAccount(debouncedSearch, limit, page);

  const accounts = data?.data || [];
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

  const deleteMutation = useDeleteAccount();

  const handleEdit = (id) => {
    navigate(`/accounts/account/${id}/edit`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this account?')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {t('Accounts Management')}
            </h1>
            <p className="text-gray-600">
              {t('Manage and monitor all customer accounts')}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <Link to="/accounts/accountAdd">
              <button className="flex items-center gap-2 px-2 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95">
                <BiSolidUserAccount className="text-lg" />
                <span>{t('Add New Account')}</span>
              </button>
            </Link>

            <button className="flex items-center gap-2 px-2 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95">
              <BsSearch className="text-lg" />
              <span>{t('Limit Search')}</span>
            </button>

            <button className="flex items-center gap-2 px-2 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95">
              <BsPrinter className="text-lg" />
              <span>{t('Print')}</span>
            </button>

            <button className="flex items-center gap-2 px-2 py-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95">
              <BsShare className="text-lg" />
              <span>{t('Share')}</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative group mb-3">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
          <div className="relative flex items-center bg-white rounded-xl shadow-lg border border-gray-100 pl-4 pr-4 py-3">
            <BsSearch className="text-gray-400 mr-3 flex-shrink-0" />
            <input
              type="text"
              placeholder={t('Search By Name')}
              value={search}
              onChange={(e) => dispatch(setSearch(e.target.value))}
              className="w-full bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 font-medium tracking-wide text-sm"
            />
            {search && (
              <button
                onClick={() => dispatch(setSearch(''))}
                className="ml-2 text-gray-400 hover:text-gray-600 transition-colors p-1"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="relative">
                  <div className="w-12 h-12 border-4 border-blue-200 rounded-full animate-spin"></div>
                  <div className="w-12 h-12 border-4 border-transparent border-t-blue-500 rounded-full animate-spin absolute top-0 left-0"></div>
                </div>
                <p className="mt-4 text-gray-600 font-medium">
                  {t('Loading accounts...')}
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Table Container */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  {/* Table Header */}
                  <thead className="bg-gradient-to-r from-gray-800 to-slate-900">
                    <tr>
                      <th className="px-2 py-4 text-center text-white font-semibold text-sm uppercase tracking-wider">
                        {t('Account No')}
                      </th>
                      <th className="px-2 py-4 text-center text-white font-semibold text-sm uppercase tracking-wider">
                        {t('Customer')}
                      </th>
                      <th className="px-2 py-4 text-center text-white font-semibold text-sm uppercase tracking-wider">
                        {t('Balance')}
                      </th>
                      <th className="px-2 py-4 text-center text-white font-semibold text-sm uppercase tracking-wider">
                        {t('Account Type')}
                      </th>
                      <th className="px-2 py-4 text-center text-white font-semibold text-sm uppercase tracking-wider">
                        {t('Date of Creation')}
                      </th>
                      <th className="px-2 py-4 text-center text-white font-semibold text-sm uppercase tracking-wider">
                        {t('Actions')}
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {accounts.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="px-6 py-16 text-center">
                          <div className="flex flex-col items-center justify-center">
                            <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4">
                              <BiSolidUserAccount className="text-4xl text-gray-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-600 mb-2">
                              {t('No accounts found')}
                            </h3>
                            <p className="text-gray-500 max-w-md text-center">
                              {t(
                                'No account records match your search criteria. Try adjusting your search or create a new account.'
                              )}
                            </p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      accounts.map((c, index) => (
                        <tr
                          key={c.No}
                          className="group hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/30 transition-all duration-200 border-b border-gray-100 last:border-b-0"
                        >
                          {/* Account Number */}
                          <td className="px-1 py-2">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                                #{c.No}
                              </div>
                              <span className="font-semibold text-gray-700">
                                #{c.No}
                              </span>
                            </div>
                          </td>

                          {/* Customer */}
                          <td className="px-1 py-2">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                {(c.Customer?.Stakeholder?.Person?.firstName?.charAt(
                                  0
                                ) || 'N') +
                                  (c.Customer?.Stakeholder?.Person?.lastName?.charAt(
                                    0
                                  ) || 'A')}
                              </div>
                              <div>
                                <p className="font-semibold text-gray-800">
                                  {c.Customer?.Stakeholder?.Person?.firstName ||
                                    'N/A'}{' '}
                                  {c.Customer?.Stakeholder?.Person?.lastName ||
                                    ''}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {t('Customer')}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Balance */}
                          <td dir="ltr" className="px-1 py-2">
                            <div className="flex items-center gap-2">
                              <span
                                className={`text-md font-bold ${
                                  c.credit < 0
                                    ? 'text-red-600'
                                    : c.credit > 0
                                    ? 'text-green-600'
                                    : 'text-gray-600'
                                }`}
                              >
                                {formatNumber(c.credit)?.toLocaleString()}
                              </span>
                            </div>
                          </td>

                          {/* Account Type */}
                          <td className="px-1 py-2">
                            <span className="inline-flex items-center px-3 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200">
                              {c.MoneyType?.typeName || 'Standard'}
                            </span>
                          </td>

                          {/* Date of Creation */}
                          <td className="px-1 py-2">
                            <div className="flex flex-col">
                              <span className="font-semibold text-gray-800">
                                {new Date(
                                  c.dateOfCreation
                                ).toLocaleDateString()}
                              </span>
                              <span className="text-sm text-gray-500">
                                {new Date(
                                  c.dateOfCreation
                                ).toLocaleTimeString()}
                              </span>
                            </div>
                          </td>

                          {/* Actions */}
                          <td className="px-1 py-2">
                            <div className="flex items-center justify-center gap-2">
                              {/* Transactions Button */}
                              <Link
                                to={`/accounts/account/${c.No}/transactions`}
                              >
                                <button className="flex items-center gap-1 px-2 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow hover:shadow-lg hover:scale-105">
                                  <BsArrowLeftRight className="text-xs" />
                                  {t('Transactions')}
                                </button>
                              </Link>

                              {/* Print Button */}
                              <button className="p-2 bg-gradient-to-br from-amber-500 to-orange-500 text-white rounded-lg transition-all duration-200 shadow hover:shadow-lg hover:scale-110 active:scale-95 group">
                                <BsPrinter className="text-sm" />
                                <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs py-1 px-2 rounded-lg">
                                  {t('Print')}
                                </div>
                              </button>

                              {/* Edit Button */}
                              <button
                                onClick={() => handleEdit(c.No)}
                                className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-lg transition-all duration-200 shadow hover:shadow-lg hover:scale-110 active:scale-95 group"
                              >
                                <BiSolidEdit className="text-sm" />
                                <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs py-1 px-2 rounded-lg">
                                  {t('Edit')}
                                </div>
                              </button>

                              {/* Delete Button */}
                              <button
                                onClick={() => handleDelete(c.No)}
                                disabled={deleteMutation.isLoading}
                                className="p-2 bg-gradient-to-br from-red-500 to-pink-500 text-white rounded-lg transition-all duration-200 shadow hover:shadow-lg hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group"
                              >
                                {deleteMutation.isLoading ? (
                                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
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
                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                  </svg>
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
              {accounts.length > 0 && (
                <div className="px-1 py-4 border-t border-gray-100 bg-gray-50/50">
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
                        onClick={() => dispatch(setPage(Math.max(page - 1, 1)))}
                        disabled={page === 1}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                          page === 1
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
                              <div key={pageNum} className="flex items-center">
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

export default AccountList;
