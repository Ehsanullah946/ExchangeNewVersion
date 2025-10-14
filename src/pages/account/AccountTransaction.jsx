import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useAllAccountTransaction } from '../../hooks/useAccount';

import { BiSolidDetail, BiSolidEdit, BiSolidUserAccount } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { ImMinus } from 'react-icons/im';
import { RiAddBoxFill } from 'react-icons/ri';
import { BsPrinter, BsSearch, BsShare } from 'react-icons/bs';
import { PulseLoader } from 'react-spinners';
import { setPage } from '../../features/ui/filterSlice';
import Button from '../../components/layout/Button';
import { formatNumber } from '../../utils/formatNumber';
const AccountTransaction = () => {
  const { accountId } = useParams();
  const { t } = useTranslation();

  const { open, limit, page } = useSelector((state) => state.filters);
  const dispatch = useDispatch();

  const { data, isLoading, error } = useAllAccountTransaction(
    accountId,
    limit,
    page
  );

  const accountTransaction = data?.data || [];
  const total = data?.total || 0;

  useEffect(() => {
    if (!accountId) {
      console.error('No account found in URL parameters');
    }
  }, [accountId]);

  const totalPages = Math.max(1, Math.ceil(total / limit));

  useEffect(() => {
    if (total > 0 && page > totalPages) {
      dispatch(setPage(totalPages));
    }
    if (total === 0 && page !== 1) {
      dispatch(setPage(1));
    }
  }, [total, totalPages, page, dispatch]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {t('Transaction History')}
            </h1>
            <p className="text-gray-600">
              {t('View and manage all financial transactions of account')}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <Link to="/accounts/accountAdd">
              <button className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 text-sm">
                <BiSolidUserAccount className="text-base" />
                <span>{t('Add New Account')}</span>
              </button>
            </Link>

            <Link to="/main/withdraw">
              <button className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 text-sm">
                <ImMinus className="text-base" />
                <span>{t('Withdraw')}</span>
              </button>
            </Link>

            <Link to="/main/deposit">
              <button className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 text-sm">
                <RiAddBoxFill className="text-base" />
                <span>{t('Deposit')}</span>
              </button>
            </Link>

            <button className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 text-sm">
              <BsSearch className="text-base" />
              <span>{t('Filter')}</span>
            </button>

            <button className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 text-sm">
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{t('Liquidate')}</span>
            </button>

            <button className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-gray-600 to-slate-700 hover:from-gray-700 hover:to-slate-800 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 text-sm">
              <BsPrinter className="text-base" />
              <span>{t('Print')}</span>
            </button>

            <button className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 text-sm">
              <BsShare className="text-base" />
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
              placeholder={t(
                'Search by transaction ID, description, or amount...'
              )}
              // value={search}
              // onChange={(e) => dispatch(setSearch(e.target.value))}
              className="w-full bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 font-medium tracking-wide text-sm"
            />
            {open && (
              <button
                // onClick={() => dispatch(setSearch(''))}
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
                  {t('Loading transactions...')}
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
                      <th className="px-4 py-3 text-center text-white font-semibold text-xs uppercase tracking-wider">
                        {t('Transaction')}
                      </th>
                      <th className="px-4 py-3 text-center text-white font-semibold text-xs uppercase tracking-wider">
                        {t('Date & Time')}
                      </th>
                      <th className="px-4 py-3 text-center text-white font-semibold text-xs uppercase tracking-wider">
                        {t('Details')}
                      </th>
                      <th className="px-4 py-3 text-center text-white font-semibold text-xs uppercase tracking-wider">
                        {t('Withdraw')}
                      </th>
                      <th className="px-4 py-3 text-center text-white font-semibold text-xs uppercase tracking-wider">
                        {t('Deposit')}
                      </th>
                      <th className="px-4 py-3 text-center text-white font-semibold text-xs uppercase tracking-wider">
                        {t('Currency')}
                      </th>
                      <th className="px-4 py-3 text-center text-white font-semibold text-xs uppercase tracking-wider">
                        {t('Balance')}
                      </th>
                      <th className="px-4 py-3 text-center text-white font-semibold text-xs uppercase tracking-wider">
                        {t('Type')}
                      </th>
                      <th className="px-4 py-3 text-center text-white font-semibold text-xs uppercase tracking-wider">
                        {t('Actions')}
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {accountTransaction.length === 0 ? (
                      <tr>
                        <td colSpan="9" className="px-6 py-16 text-center">
                          <div className="flex flex-col items-center justify-center">
                            <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4">
                              <svg
                                className="w-12 h-12 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                              </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-600 mb-2">
                              {t('No transactions found')}
                            </h3>
                            <p className="text-gray-500 max-w-md text-center">
                              {t(
                                'No transaction records match your search criteria. Try adjusting your search.'
                              )}
                            </p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      accountTransaction.map((c, index) => (
                        <tr
                          key={index}
                          className="group hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-indigo-50/20 transition-all duration-200 border-b border-gray-100 last:border-b-0"
                        >
                          {/* Transaction ID */}
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                                #
                              </div>
                              <span className="font-mono text-sm font-semibold text-gray-700">
                                {c.No || c.transferNo || c.receiveNo || 'N/A'}
                              </span>
                            </div>
                          </td>

                          {/* Date & Time */}
                          <td className="px-4 py-3">
                            <div className="flex flex-col">
                              <span className="font-semibold text-gray-800 text-sm">
                                {new Date(c.date).toLocaleDateString('en-GB')}
                              </span>
                              <span className="text-xs text-gray-500">
                                {new Date(c.date).toLocaleTimeString()}
                              </span>
                            </div>
                          </td>

                          {/* Details */}
                          <td className="px-3 py-2">
                            {c.description ||
                              (c.type === 'transfer'
                                ? `${c.senderName || ''} ⬅️ ${
                                    c.receiverName || '-'
                                  }`
                                : c.type === 'receive'
                                ? `${c.senderName || ''} ⬅️ ${
                                    c.receiverName || '-'
                                  }`
                                : '-')}
                          </td>

                          {/* Withdraw */}
                          <td className="px-4 py-3 text-center">
                            {(c.withdraw ||
                              (c.type === 'transfer' ? c.transferAmount : 0)) >
                              0 && (
                              <div className="flex items-center justify-end gap-1">
                                <ImMinus className="text-red-500 text-xs" />
                                <span className="text-red-600 font-bold text-sm">
                                  {(
                                    c.withdraw || c.transferAmount
                                  )?.toLocaleString()}
                                </span>
                              </div>
                            )}
                          </td>

                          {/* Deposit */}
                          <td className="px-4 py-3 text-right">
                            {(c.deposit ||
                              (c.type === 'receive' ? c.receiveAmount : 0)) >
                              0 && (
                              <div className="flex items-center justify-end gap-1">
                                <RiAddBoxFill className="text-green-500 text-xs" />
                                <span className="text-green-600 font-bold text-sm">
                                  {(
                                    c.deposit || c.receiveAmount
                                  )?.toLocaleString()}
                                </span>
                              </div>
                            )}
                          </td>

                          {/* Currency */}
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                              {c.Account?.MoneyType?.typeName ||
                                c.MainMoneyType?.typeName ||
                                'N/A'}
                            </span>
                          </td>

                          {/* Balance */}
                          <td dir="ltr" className="px-4 py-3 text-right">
                            <span
                              className={`font-bold text-sm ${
                                c.runningBalance < 0
                                  ? 'text-red-600'
                                  : c.runningBalance > 0
                                  ? 'text-green-600'
                                  : 'text-gray-600'
                              }`}
                            >
                              {formatNumber(c.runningBalance)}
                            </span>
                          </td>

                          {/* Type */}
                          <td className="px-4 py-3 text-center">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                                c.type === 'deposit'
                                  ? 'bg-green-100 text-green-800 border border-green-200'
                                  : c.type === 'withdraw'
                                  ? 'bg-red-100 text-red-800 border border-red-200'
                                  : c.type === 'transfer'
                                  ? 'bg-blue-100 text-blue-800 border border-blue-200'
                                  : c.type === 'receive'
                                  ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                                  : 'bg-gray-100 text-gray-800 border border-gray-200'
                              }`}
                            >
                              {t(c.type)}
                            </span>
                          </td>

                          {/* Actions */}
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-center gap-1">
                              {/* Print */}
                              <button className="p-1.5 bg-gradient-to-br from-amber-500 to-orange-500 text-white rounded-lg transition-all duration-200 shadow hover:shadow-lg hover:scale-110 active:scale-95 group">
                                <BsPrinter className="text-xs" />
                                <div className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-xs py-1 px-2 rounded-lg">
                                  {t('Print')}
                                </div>
                              </button>

                              {/* Details */}
                              <button className="p-1.5 bg-gradient-to-br from-purple-500 to-indigo-500 text-white rounded-lg transition-all duration-200 shadow hover:shadow-lg hover:scale-110 active:scale-95 group">
                                <BiSolidDetail className="text-xs" />
                                <div className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-xs py-1 px-2 rounded-lg">
                                  {t('Details')}
                                </div>
                              </button>

                              {/* Edit */}
                              <button className="p-1.5 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-lg transition-all duration-200 shadow hover:shadow-lg hover:scale-110 active:scale-95 group">
                                <BiSolidEdit className="text-xs" />
                                <div className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-xs py-1 px-2 rounded-lg">
                                  {t('Edit')}
                                </div>
                              </button>

                              {/* Delete */}
                              <button className="p-1.5 bg-gradient-to-br from-red-500 to-pink-500 text-white rounded-lg transition-all duration-200 shadow hover:shadow-lg hover:scale-110 active:scale-95 group">
                                <svg
                                  className="w-3 h-3"
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
                                <div className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-xs py-1 px-2 rounded-lg">
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
              {accountTransaction.length > 0 && (
                <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
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
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 text-sm ${
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
                                  className={`min-w-8 h-8 flex items-center justify-center rounded-lg font-medium transition-all duration-200 text-sm ${
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
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 text-sm ${
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

export default AccountTransaction;
