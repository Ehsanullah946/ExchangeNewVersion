import React, { useEffect, useState } from 'react';
import { BiSolidEdit } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import {
  BsArrowReturnRight,
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
import { RiDownload2Line } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import {
  setDebouncedSearch,
  setSearch,
  setPage,
  toggleOpen,
} from '../../../features/ui/filterSlice';
import {
  useDeleteReceive,
  useReceive,
  useRejectReceive,
} from '../../../hooks/useReceive';
import { showToast } from '../../../features/toast/toastSlice';
import { formatNumber } from '../../../utils/formatNumber';
import { generateReceivePrintHTML } from '../../../utils/printUtils';
import { useDateFormatter } from '../../../hooks/useDateFormatter';
import { useFlexiblePrint } from '../../../hooks/useFlexiblePrint';

const ReceiveList = () => {
  const { t } = useTranslation();
  const [pendingAction, setPendingAction] = useState({ type: null, id: null });

  const { open, search, limit, page, debouncedSearch } = useSelector(
    (state) => state.filters
  );

  const { formatDisplay } = useDateFormatter();
  const dispatch = useDispatch();

  useEffect(() => {
    const handler = setTimeout(() => dispatch(setDebouncedSearch(search)), 500);
    return () => clearTimeout(handler);
  }, [search, dispatch]);

  useEffect(() => {
    dispatch(setPage(1));
  }, [debouncedSearch, dispatch]);

  const { data, isLoading } = useReceive(debouncedSearch, limit, page);

  const receive = data?.data || [];
  const total = data?.total || 0;

  console.log('receive Data:', receive);

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

  const deleteMutation = useDeleteReceive();
  const rejectMutation = useRejectReceive();

  const handleEdit = (id) => {
    navigate(`/main/receive/${id}/edit`);
  };

  // Toast confirmation for delete
  const handleDelete = (id) => {
    setPendingAction({ type: 'delete', id });
    dispatch(
      showToast({
        message: t('Are you sure you want to delete this receive?'),
        type: 'warning',
        duration: 6000,
        position: 'top-center',
        actions: [
          {
            label: t('Confirm'),
            action: () => confirmDelete(id),
            style: 'danger',
          },
          {
            label: t('Cancel'),
            action: () => cancelAction(),
            style: 'secondary',
          },
        ],
      })
    );
  };

  // Toast confirmation for reject
  const handleReject = (id) => {
    setPendingAction({ type: 'reject', id });
    dispatch(
      showToast({
        message: t('Are you sure you want to reject this receive?'),
        type: 'warning',
        duration: 6000,
        position: 'top-center',
        actions: [
          {
            label: t('Confirm Reject'),
            action: () => confirmReject(id),
            style: 'danger',
          },
          {
            label: t('Cancel'),
            action: () => cancelAction(),
            style: 'secondary',
          },
        ],
      })
    );
  };

  const confirmDelete = (id) => {
    deleteMutation.mutate(id);
    setPendingAction({ type: null, id: null });
    dispatch(
      showToast({
        message: t('Receive deleted successfully'),
        type: 'success',
        duration: 3000,
      })
    );
  };

  const confirmReject = (id) => {
    rejectMutation.mutate(id);
    setPendingAction({ type: null, id: null });
    dispatch(
      showToast({
        message: t('Receive rejected successfully'),
        type: 'success',
        duration: 3000,
      })
    );
  };

  const cancelAction = () => {
    setPendingAction({ type: null, id: null });
  };

  // Check if item is rejected (you might need to adjust this based on your data structure)
  const isRejected = (item) => {
    // Adjust this condition based on your actual data structure
    return item.rejected === true || item.status === 'rejected';
  };

  const getRowStyles = (item) => {
    if (isRejected(item)) {
      return 'bg-gradient-to-r from-red-50/80 to-rose-50/60 border-l-4 border-red-400';
    }
    return 'group hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/30 transition-all duration-200 border-b border-gray-100 last:border-b-0';
  };

  const getStatusBadge = (item) => {
    if (isRejected(item)) {
      return (
        <span className="bg-gradient-to-br from-red-500 to-rose-600 rounded-full flex items-center justify-center text-white font-bold text-xs px-3 py-1">
          {t('Rejected')}
        </span>
      );
    }

    return item.receiveStatus === true ? (
      <span className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-xs px-3 py-1">
        {t('Completed')}
      </span>
    ) : (
      <span className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xs px-3 py-1">
        {t('Uncomplete')}
      </span>
    );
  };

  const { printContent } = useFlexiblePrint();

  const handleprint = (transferData) => {
    const printHTML = generateReceivePrintHTML(transferData, t, formatDisplay);
    const title = `Receive_Receipt_${transferData.transferNo}`;
    printContent(printHTML, {
      title: title,
      paperSize: '80mm',
      orientation: 'portrait',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 py-3 px-2">
      <div className="max-w-7xl mx-auto">
        {/* Header Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-2 p-1 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
          <div className="flex flex-wrap items-center gap-3">
            <Link to="/main/receive">
              <button className="flex items-center gap-2  px-2 py-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95">
                <RiDownload2Line className="mt-1" />
                <span>{t('Receive')}</span>
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
                          {t('Status')}
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
                      {receive.length === 0 ? (
                        <tr>
                          <td colSpan="10" className="px-6 py-16 text-center">
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
                        receive.map((c, index) => (
                          <tr key={c.id} className={getRowStyles(c)}>
                            <td className="px-2 py-2">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-6 h-7 rounded-lg flex items-center justify-center text-white font-bold text-sm ${
                                    isRejected(c)
                                      ? 'bg-gradient-to-br from-red-500 to-rose-500'
                                      : 'bg-gradient-to-br from-blue-500 to-cyan-500'
                                  }`}
                                >
                                  {index + 1}
                                </div>
                                <span
                                  className={`font-semibold ${
                                    isRejected(c)
                                      ? 'text-red-700'
                                      : 'text-gray-700'
                                  }`}
                                >
                                  #{c.receiveNo}
                                </span>
                              </div>
                            </td>

                            <td className="px-1 py-1">
                              <div className="flex items-center gap-2">
                                <div
                                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                                    isRejected(c)
                                      ? 'bg-gradient-to-br from-red-400 to-rose-400'
                                      : 'bg-gradient-to-br from-purple-500 to-pink-500'
                                  }`}
                                >
                                  {c.senderName?.charAt(0) || 'U'}
                                </div>
                                <div>
                                  <p
                                    className={`font-semibold ${
                                      isRejected(c)
                                        ? 'text-red-800'
                                        : 'text-gray-800'
                                    }`}
                                  >
                                    {c.senderName || 'Unknown'}
                                  </p>
                                  <p
                                    className={`text-sm ${
                                      isRejected(c)
                                        ? 'text-red-500'
                                        : 'text-gray-500'
                                    }`}
                                  >
                                    {t('Transfer')}
                                  </p>
                                </div>
                              </div>
                            </td>

                            <td className="px-1 py-1">
                              <div className="flex items-center gap-2">
                                <div
                                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                                    isRejected(c)
                                      ? 'bg-gradient-to-br from-red-400 to-rose-400'
                                      : 'bg-gradient-to-br from-purple-500 to-pink-500'
                                  }`}
                                >
                                  {c.receiverName?.charAt(0) || 'U'}
                                </div>
                                <div>
                                  <p
                                    className={`font-semibold ${
                                      isRejected(c)
                                        ? 'text-red-800'
                                        : 'text-gray-800'
                                    }`}
                                  >
                                    {c.receiverName || 'Unknown'}
                                  </p>
                                  <p
                                    className={`text-sm ${
                                      isRejected(c)
                                        ? 'text-red-500'
                                        : 'text-gray-500'
                                    }`}
                                  >
                                    {t('Receiver')}
                                  </p>
                                </div>
                              </div>
                            </td>

                            <td className="px-2 py-2">
                              <div className="flex items-center gap-2">
                                <span
                                  className={`font-bold text-md ${
                                    isRejected(c)
                                      ? 'text-red-600'
                                      : 'text-green-600'
                                  }`}
                                >
                                  {formatNumber(
                                    c.receiveAmount
                                  )?.toLocaleString()}
                                </span>
                              </div>
                            </td>

                            <td className="px-2 py-1">
                              <span
                                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${
                                  isRejected(c)
                                    ? 'bg-red-100 text-red-800 border-red-200'
                                    : 'bg-blue-100 text-blue-800 border-blue-200'
                                }`}
                              >
                                {c.MainMoneyType.typeName || 'N/A'}
                              </span>
                            </td>

                            <td className="px-2 py-2">
                              <div className="flex items-center gap-2">
                                <span
                                  className={`font-bold text-md ${
                                    isRejected(c)
                                      ? 'text-red-600'
                                      : 'text-green-600'
                                  }`}
                                >
                                  {formatNumber(
                                    c.chargesAmount
                                  )?.toLocaleString()}
                                </span>
                              </div>
                            </td>

                            <td className="px-2 py-1">
                              <span
                                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${
                                  isRejected(c)
                                    ? 'bg-red-100 text-red-800 border-red-200'
                                    : 'bg-blue-100 text-blue-800 border-blue-200'
                                }`}
                              >
                                {c.ChargesMoneyType.typeName || 'N/A'}
                              </span>
                            </td>

                            <td className="w-16 items-center">
                              {getStatusBadge(c)}
                            </td>

                            <td className="px-2 py-1 max-w-xs">
                              <p
                                className={
                                  isRejected(c)
                                    ? 'text-red-600'
                                    : 'text-gray-600'
                                }
                              >
                                {c.description}
                              </p>
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

                                {/* Edit Button - Disabled for rejected items */}
                                <button
                                  onClick={() => handleEdit(c.id)}
                                  disabled={isRejected(c)}
                                  className={`p-2 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 group ${
                                    isRejected(c)
                                      ? 'bg-gray-400 cursor-not-allowed'
                                      : 'bg-gradient-to-br from-blue-500 to-cyan-500'
                                  } text-white`}
                                >
                                  <BiSolidEdit className="text-md" />
                                  <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs py-1 px-2 rounded-lg">
                                    {isRejected(c)
                                      ? t('Cannot edit rejected')
                                      : t('Edit')}
                                  </div>
                                </button>

                                {/* Reject Button - Hide for already rejected items */}
                                {!isRejected(c) && (
                                  <button
                                    onClick={() => handleReject(c.id)}
                                    disabled={rejectMutation.isLoading}
                                    className="p-2 bg-gradient-to-br from-red-500 to-pink-500 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group"
                                  >
                                    {rejectMutation.isLoading &&
                                    pendingAction.id === c.id ? (
                                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                      <BsArrowReturnRight className="text-md" />
                                    )}
                                    <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs py-1 px-2 rounded-lg">
                                      {t('Reject')}
                                    </div>
                                  </button>
                                )}

                                {/* Delete Button */}
                                <button
                                  onClick={() => handleDelete(c.id)}
                                  disabled={deleteMutation.isLoading}
                                  className="p-2 bg-gradient-to-br from-red-500 to-pink-500 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group"
                                >
                                  {deleteMutation.isLoading &&
                                  pendingAction.id === c.id ? (
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
                {receive.length > 0 && (
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

export default ReceiveList;
