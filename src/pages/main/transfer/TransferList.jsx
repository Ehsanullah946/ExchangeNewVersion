import React, { useEffect, useState } from 'react';
import { BiSolidEdit, BiSolidUserAccount } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';
import Button from '../../../components/layout/Button';
import { Link, useNavigate } from 'react-router-dom';
import {
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
} from 'react-icons/bs';
import { PulseLoader } from 'react-spinners';
import { BsSend } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import {
  setDebouncedSearch,
  setSearch,
  setPage,
  toggleOpen,
} from '../../../features/ui/filterSlice';
import { useDeleteTransfer, useTransfer } from '../../../hooks/useTransfer';
const TransferList = () => {
  const { t } = useTranslation();

  const { open, search, limit, page, debouncedSearch } = useSelector(
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

  const { data, isLoading } = useTransfer(debouncedSearch, limit, page);

  const transfer = data?.data || [];
  const total = data?.total || 0;

  console.log('transfer Data:', transfer);

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

  const deleteMutation = useDeleteTransfer();

  const handleEdit = (id) => {
    navigate(`/main/transfer/${id}/edit`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this transfer?')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 py-3 px-2">
      <div className="max-w-7xl mx-auto">
        {/* Header Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-2 p-1 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
          <div className="flex flex-wrap items-center gap-3">
            <Link to="/main/transfer">
              <button className="flex items-center gap-2  px-2 py-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95">
                <BsSend className="mt-1" />
                <span>{t('Send')}</span>
              </button>
            </Link>

            <button
              onClick={() => dispatch(toggleOpen(!open))}
              className="flex items-center gap-2 px-2 py-1 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
            >
              <BsFilter className="mt-1" />
              <span>{t('Limit Search')}</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative group">
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
                            {t('Transfer')}
                          </div>
                        </th>
                        <th className="px-2 py-4 text-center text-white font-semibold text-sm uppercase tracking-wider">
                          <div className="flex items-center gap-2">
                            <BsPerson className="text-gray-400" />
                            {t('Receiver')}
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
                          <div className="flex items-center gap-2">
                            <BsCurrencyDollar className="text-gray-400" />
                            {t('charges')}
                          </div>
                        </th>
                        <th className="px-2 py-4 text-center text-white font-semibold text-sm uppercase tracking-wider">
                          {t('Currency')}
                        </th>
                        <th className="px-2 py-4 text-center text-white font-semibold text-sm uppercase tracking-wider">
                          {t('Description')}
                        </th>
                        <th className="px-2 py-4 text-center text-white font-semibold text-sm uppercase tracking-wider">
                          {t('Actions')}
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                      {transfer.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="px-6 py-16 text-center">
                            <div className="flex flex-col items-center justify-center">
                              <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4">
                                <BsInbox className="text-4xl text-gray-400" />
                              </div>
                              <h3 className="text-xl font-bold text-gray-600 mb-2">
                                {t('No Transaction found for your search')}
                              </h3>
                              <p className="text-gray-500 max-w-md">
                                {t(
                                  'No deposit records match your search criteria. Try adjusting your search or create a new deposit.'
                                )}
                              </p>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        transfer.map((c, index) => (
                          <tr
                            key={c.id}
                            className="group hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/30 transition-all duration-200 border-b border-gray-100 last:border-b-0"
                          >
                            <td className="px-2 py-2">
                              <div className="flex items-center gap-3">
                                <div className="w-6 h-7 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                                  {index + 1}
                                </div>
                                <span className="font-semibold text-gray-700">
                                  #{c.transferNo}
                                </span>
                              </div>
                            </td>

                            <td className="px-1 py-1">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                  {c.senderName?.charAt(0) || 'U'}
                                </div>
                                <div>
                                  <p className="font-semibold text-gray-800">
                                    {c.senderName || 'Unknown'}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    {t('Transfer')}
                                  </p>
                                </div>
                              </div>
                            </td>

                            <td className="px-1 py-1">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                  {c.receiverName?.charAt(0) || 'U'}
                                </div>
                                <div>
                                  <p className="font-semibold text-gray-800">
                                    {c.receiverName || 'Unknown'}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    {t('Receiver')}
                                  </p>
                                </div>
                              </div>
                            </td>

                            <td className="px-2 py-2">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-md text-green-600">
                                  {c.transferAmount?.toLocaleString()}
                                </span>
                              </div>
                            </td>

                            <td className="px-2 py-1">
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200">
                                {c.MainMoneyType.typeName || 'N/A'}
                              </span>
                            </td>

                            <td className="px-2 py-2">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-md text-green-600">
                                  {c.chargesAmount?.toLocaleString()}
                                </span>
                              </div>
                            </td>

                            <td className="px-2 py-1">
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200">
                                {c.ChargesMoneyType.typeName || 'N/A'}
                              </span>
                            </td>

                            <td className="px-2 py-1 max-w-xs">
                              <p className="text-gray-600 ">{c.description}</p>
                            </td>

                            {/* Action Buttons */}
                            <td className="px-2 py-1">
                              <div className="flex items-center justify-center gap-3">
                                {/* Print Button */}
                                <button className="p-2 bg-gradient-to-br from-amber-500 to-orange-500 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 group">
                                  <BsPrinter className="text-md" />
                                  <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs py-1 px-2 rounded-lg">
                                    {t('Print')}
                                  </div>
                                </button>

                                {/* Edit Button */}
                                <button
                                  onClick={() => handleEdit(c.id)}
                                  className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 group"
                                >
                                  <BiSolidEdit className="text-md" />
                                  <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs py-1 px-2 rounded-lg">
                                    {t('Edit')}
                                  </div>
                                </button>

                                {/* Delete Button */}
                                <button
                                  onClick={() => handleDelete(c.id)}
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
                {transfer.length > 0 && (
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

export default TransferList;
