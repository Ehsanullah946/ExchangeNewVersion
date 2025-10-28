import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { BiSolidUserAccount } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ImMinus } from 'react-icons/im';
import { RiAddBoxFill } from 'react-icons/ri';
import { BsPrinter, BsSearch, BsShare } from 'react-icons/bs';
import { setPage } from '../../../features/ui/filterSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  useAllTransaction,
  useCustomerDetails,
  useCustomerLiquidations,
  useDeleteLiquidation,
  useLiquidateCustomer,
} from '../../../hooks/useCustomers';
import { formatNumber } from '../../../utils/formatNumber';
import { useDateFormatter } from '../../../hooks/useDateFormatter';
import { generateTransactionPrintHTML } from '../../../utils/printUtils';
import { useFlexiblePrint } from '../../../hooks/useFlexiblePrint';

const CustomerTransactions = () => {
  const { customerId } = useParams();
  const { formatDisplay } = useDateFormatter();
  const { t } = useTranslation();

  const { open, limit, page } = useSelector((state) => state.filters);
  const dispatch = useDispatch();

  const { data, isLoading } = useAllTransaction(customerId, limit, page);

  const { data: customerData } = useCustomerDetails(customerId);
  const customer = customerData?.data || {};
  const customerName = customer?.Stakeholder?.Person
    ? `${customer.Stakeholder.Person.firstName} ${customer.Stakeholder.Person.lastName}`
    : 'Customer';

  const customerTransaction = data?.data || [];
  const total = data?.total || 0;

  const [showLiquidateModal, setShowLiquidateModal] = useState(false);
  const [showLiquidations, setShowLiquidations] = useState(false);

  const [liquidateData, setLiquidateData] = useState({
    startDate: '',
    endDate: new Date().toISOString().split('T')[0], // Today as default end date
    closeAccounts: false,
    description: '',
  });

  const { mutate: liquidateCustomer, isLoading: isLiquidating } =
    useLiquidateCustomer();

  const handleLiquidate = () => {
    liquidateCustomer(
      { customerId, ...liquidateData },
      {
        onSuccess: (data) => {
          setShowLiquidateModal(false);
          // Show success message or download report
          console.log('Liquidation successful:', data);
          // You can trigger download or show report here
        },
        onError: (error) => {
          console.error('Liquidation failed:', error);
        },
      }
    );
  };

  const { printContent } = useFlexiblePrint();

  const handlePrint = () => {
    const printHTML = generateTransactionPrintHTML(
      customerTransaction,
      {
        name: customerName,
        id: customerId,
      },
      data?.accountSummary || [],
      t,
      formatDisplay
    );

    printContent(printHTML, {
      title: `Transactions_${customerName}`,
      paperSize: 'A4-landscape',
      orientation: 'landscape',
    });
  };

  const {
    data: liquidationsData,
    isLoading: liquidationsLoading,
    refetch: refetchLiquidations,
  } = useCustomerLiquidations(customerId);

  const liquidations = liquidationsData?.data || [];

  const handleDateChange = (field, value) => {
    setLiquidateData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // delete liquidation
  const { mutate: deleteLiquidation } = useDeleteLiquidation();

  const handleDeleteLiquidation = (liquidationId) => {
    if (
      window.confirm(
        t(
          'Are you sure you want to delete this liquidation? Transactions will be restored.'
        )
      )
    ) {
      deleteLiquidation(liquidationId, {
        onSuccess: () => {
          refetchLiquidations();
        },
      });
    }
  };

  useEffect(() => {
    if (!customerId) {
      console.error('No customerId found in URL parameters');
    }
  }, [customerId]);

  const totalPages = Math.max(1, Math.ceil(total / limit));

  useEffect(() => {
    if (total > 0 && page > totalPages) {
      dispatch(setPage(totalPages));
    }
    if (total === 0 && page !== 1) {
      dispatch(setPage(1));
    }
  }, [total, totalPages, page, dispatch]);

  const getTransactionDescription = (transaction) => {
    if (transaction.description) {
      return transaction.description;
    }

    switch (transaction.type) {
      case 'deposit':
        return t('Deposit to account');
      case 'withdraw':
        return t('Withdrawal from account');
      case 'transfer':
        return `${transaction.senderName || t('Sender')} → ${
          transaction.receiverName || t('Receiver')
        }`;
      case 'receive':
        return `${transaction.senderName || t('Sender')} → ${
          transaction.receiverName || t('Receiver')
        }`;
      case 'exchange_sale':
        return t('Currency Sale');
      case 'exchange_purchase':
        return t('Currency Purchase');
      default:
        return t('Transaction');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {t('Transaction History')}
            </h1>
            <div className="flex items-center gap-4">
              <p className="text-gray-600">
                {t('Customer')}:{' '}
                <span className="font-semibold text-blue-600">
                  {customerName}
                </span>
              </p>
              <p className="text-sm text-gray-500">ID: {customerId}</p>
            </div>
            <p className="text-gray-600">
              {t('View and manage all financial transactions')}
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

            <button
              onClick={() => setShowLiquidateModal(true)}
              className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 text-sm"
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{t('Liquidate')}</span>
            </button>
            <button
              onClick={() => {
                setShowLiquidations(true);
                refetchLiquidations(); // Refresh data when opening
              }}
              className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 text-sm"
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
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <span>{t('View Liquidations')}</span>
              {liquidations.length > 0 && (
                <span className="bg-white text-indigo-600 text-xs px-2 py-1 rounded-full font-bold">
                  {liquidations.length}
                </span>
              )}
            </button>

            {/* Fixed Print Button */}
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-gray-600 to-slate-700 hover:from-gray-700 hover:to-slate-800 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 text-sm"
            >
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
              className="w-full bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 font-medium tracking-wide text-sm"
            />
            {open && (
              <button className="ml-2 text-gray-400 hover:text-gray-600 transition-colors p-1">
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

        {/* Summary Cards */}
        {!isLoading && customerTransaction.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {data?.accountSummary?.map((account, index) => (
                <div
                  key={account.accountNo}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-4 text-white shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-90">
                        {t('Account')} {account.accountNo}
                      </p>
                      <p
                        dir="ltr"
                        className={`text-2xl font-bold ${
                          account.balance < 0
                            ? 'text-red-400'
                            : account.balance > 0
                            ? 'text-white'
                            : 'text-gray-600'
                        }`}
                      >
                        {formatNumber(account.balance)?.toLocaleString()}
                      </p>
                      <p className="text-sm opacity-80 mt-1">
                        {account.currency}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <RiAddBoxFill className="text-xl" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl p-4 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">{t('Total Accounts')}</p>
                  <p className="text-2xl font-bold">
                    {data?.accountCount || 0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <BiSolidUserAccount className="text-xl" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-4 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">
                    {t('Total Transactions')}
                  </p>
                  <p className="text-2xl font-bold">{total}</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}

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
                        {t('Debit')}
                      </th>
                      <th className="px-4 py-3 text-center text-white font-semibold text-xs uppercase tracking-wider">
                        {t('Credit')}
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
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {customerTransaction.length === 0 ? (
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
                      customerTransaction.map((transaction, index) => (
                        <tr
                          key={index}
                          className="group hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-indigo-50/20 transition-all duration-200 border-b border-gray-100 last:border-b-0"
                        >
                          {/* Transaction ID */}
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs ${
                                  transaction.type === 'deposit' ||
                                  transaction.type === 'exchange_purchase'
                                    ? 'bg-gradient-to-br from-green-500 to-emerald-500'
                                    : transaction.type === 'withdraw' ||
                                      transaction.type === 'exchange_sale'
                                    ? 'bg-gradient-to-br from-red-500 to-pink-500'
                                    : transaction.type === 'transfer'
                                    ? 'bg-gradient-to-br from-blue-500 to-cyan-500'
                                    : transaction.type === 'receive'
                                    ? 'bg-gradient-to-br from-yellow-500 to-amber-500'
                                    : 'bg-gradient-to-br from-purple-500 to-indigo-500'
                                }`}
                              >
                                {transaction.type === 'deposit'
                                  ? 'D'
                                  : transaction.type === 'withdraw'
                                  ? 'W'
                                  : transaction.type === 'transfer'
                                  ? 'T'
                                  : transaction.type === 'receive'
                                  ? 'R'
                                  : transaction.type === 'exchange_sale'
                                  ? 'S'
                                  : 'P'}
                              </div>
                              <div className="flex flex-col">
                                <span className="font-mono text-sm font-semibold text-gray-700">
                                  {transaction.No ||
                                    transaction.transferNo ||
                                    transaction.receiveNo ||
                                    transaction.id ||
                                    'N/A'}
                                  {transaction.exchangeDetails &&
                                    ` (Ex-${transaction.exchangeDetails.exchangeId})`}
                                </span>
                                {transaction.accountNo && (
                                  <span className="text-xs text-gray-500">
                                    Acc: {transaction.accountNo}
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* Date & Time */}
                          <td className="px-4 py-3">
                            <div className="flex flex-col">
                              <span className="font-semibold text-gray-800 text-sm">
                                {formatDisplay(transaction.date, {
                                  showTime: true,
                                })}
                              </span>
                            </div>
                          </td>

                          {/* Details */}
                          <td className="px-4 py-3">
                            <div className="flex flex-col">
                              <span className="text-sm text-gray-800 font-medium">
                                {getTransactionDescription(transaction)}
                              </span>
                              {transaction.exchangeDetails && (
                                <div className="text-xs text-gray-600 mt-1">
                                  <div>
                                    {t('Rates')}:{' '}
                                    {transaction.exchangeDetails.rate}
                                  </div>
                                  {transaction.exchangeDetails.isSale && (
                                    <div>
                                      {transaction.exchangeDetails.saleCurrency}
                                    </div>
                                  )}
                                  {transaction.exchangeDetails.isPurchase && (
                                    <div>
                                      {
                                        transaction.exchangeDetails
                                          .purchaseCurrency
                                      }
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </td>

                          {/* Debit */}
                          <td className="px-4 py-3 text-right">
                            {transaction.debit > 0 && (
                              <div className="flex items-center justify-end gap-1">
                                <ImMinus className="text-red-500 text-xs" />
                                <span className="text-red-600 font-bold text-sm">
                                  {transaction.debit?.toLocaleString()}
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
                                  {transaction.credit?.toLocaleString()}
                                </span>
                              </div>
                            )}
                          </td>

                          {/* Currency */}
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                              {transaction.moneyType || 'N/A'}
                            </span>
                          </td>

                          {/* Balance */}
                          <td dir="ltr" className="px-4 py-3 text-right">
                            <span
                              className={`font-bold text-sm ${
                                transaction.runningBalance < 0
                                  ? 'text-red-600'
                                  : transaction.runningBalance > 0
                                  ? 'text-green-600'
                                  : 'text-gray-600'
                              }`}
                            >
                              {transaction.runningBalance?.toLocaleString()}
                            </span>
                          </td>

                          {/* Type */}
                          <td className="px-4 py-3 text-center">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                                transaction.type === 'deposit' ||
                                transaction.type === 'exchange_purchase'
                                  ? 'bg-green-100 text-green-800 border border-green-200'
                                  : transaction.type === 'withdraw' ||
                                    transaction.type === 'exchange_sale'
                                  ? 'bg-red-100 text-red-800 border border-red-200'
                                  : transaction.type === 'transfer'
                                  ? 'bg-blue-100 text-blue-800 border border-blue-200'
                                  : transaction.type === 'receive'
                                  ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                                  : 'bg-purple-100 text-purple-800 border border-purple-200'
                              }`}
                            >
                              {t(
                                transaction.type === 'exchange_sale'
                                  ? 'Exchange Sale'
                                  : transaction.type === 'exchange_purchase'
                                  ? 'Exchange Purchase'
                                  : transaction.type
                              )}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {customerTransaction.length > 0 && (
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

          {/* Modals remain the same */}
          {showLiquidateModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {t('Liquidate Customer Accounts')}
                  </h3>

                  <div className="space-y-4">
                    {/* Date Range */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t('Start Date')}
                        </label>
                        <input
                          type="date"
                          value={liquidateData.startDate}
                          onChange={(e) =>
                            handleDateChange('startDate', e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t('End Date')}
                        </label>
                        <input
                          type="date"
                          value={liquidateData.endDate}
                          onChange={(e) =>
                            handleDateChange('endDate', e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    {/* Close Accounts Toggle */}
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="closeAccounts"
                        checked={liquidateData.closeAccounts}
                        onChange={(e) =>
                          handleDateChange('closeAccounts', e.target.checked)
                        }
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label
                        htmlFor="closeAccounts"
                        className="text-sm text-gray-700"
                      >
                        {t('Close all accounts after liquidation')}
                      </label>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('Description (Optional)')}
                      </label>
                      <textarea
                        value={liquidateData.description}
                        onChange={(e) =>
                          handleDateChange('description', e.target.value)
                        }
                        placeholder={t('Add notes about this liquidation...')}
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => setShowLiquidateModal(false)}
                      className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                    >
                      {t('Cancel')}
                    </button>
                    <button
                      onClick={handleLiquidate}
                      disabled={
                        !liquidateData.startDate ||
                        !liquidateData.endDate ||
                        isLiquidating
                      }
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLiquidating
                        ? t('Processing...')
                        : t('Generate Report')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {showLiquidations && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-500000 p-3">
              <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {t('Liquidation History')}
                      </h3>
                      <p className="text-gray-600 mt-1">
                        {t('Liquidated periods for')}
                        {' :'}
                        <span className="font-semibold text-blue-600">
                          {customerName} 🙋
                        </span>
                      </p>
                    </div>
                    <button
                      onClick={() => setShowLiquidations(false)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <svg
                        className="w-6 h-6"
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
                  </div>
                </div>

                <div className="p-4 overflow-y-auto max-h-[60vh]">
                  {liquidationsLoading ? (
                    <div className="flex justify-center items-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    </div>
                  ) : liquidations.length > 0 ? (
                    <div className="space-y-3">
                      {liquidations.map((liquidation) => (
                        <div
                          key={liquidation.id}
                          className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-gray-300 transition-colors"
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <p className="font-semibold text-gray-800 text-lg">
                                  {liquidation.period}
                                </p>
                                <span
                                  className={`px-2 py-1 text-xs rounded-full ${
                                    liquidation.closedAccounts
                                      ? 'bg-red-100 text-red-800'
                                      : 'bg-green-100 text-green-800'
                                  }`}
                                >
                                  {liquidation.closedAccounts
                                    ? t('Accounts Closed')
                                    : t('Accounts Active')}
                                </span>
                              </div>

                              <p className="text-sm text-gray-600 mb-2">
                                {liquidation.description}
                              </p>

                              <div className="flex items-center gap-3 text-xs text-gray-500">
                                <span className="flex items-center gap-1">
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
                                      d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                    />
                                  </svg>
                                  {liquidation.transactionCount}{' '}
                                  {t('transactions')}
                                </span>
                                <span className="flex items-center gap-1">
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
                                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                  </svg>
                                  {new Date(
                                    liquidation.createdAt
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                            </div>

                            <div className="flex gap-2 ml-3">
                              <button
                                onClick={() =>
                                  handleDeleteLiquidation(liquidation.id)
                                }
                                className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg transition-colors flex items-center gap-1"
                                title={t(
                                  'Delete liquidation and restore transactions'
                                )}
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
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                                {t('Delete')}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg
                          className="w-10 h-10 text-gray-400"
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
                      </div>
                      <h4 className="text-lg font-semibold text-gray-600 mb-1">
                        {t('No Liquidations Found')}
                      </h4>
                      <p className="text-gray-500 max-w-md mx-auto">
                        {t(
                          'No liquidation records found for this customer. Create your first liquidation to archive transactions.'
                        )}
                      </p>
                    </div>
                  )}
                </div>

                <div className="p-3 border-t border-gray-200 bg-gray-50">
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowLiquidations(false)}
                      className="flex-1 px-3 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-medium transition-colors"
                    >
                      {t('Close')}
                    </button>
                    <button
                      onClick={() => {
                        setShowLiquidations(false);
                        // Optionally open liquidation modal here
                      }}
                      className="flex-1 px-3 py-2 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white rounded-lg font-medium transition-colors"
                    >
                      {t('Create New Liquidation')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hidden Printable Content - MUST be at the root level */}
      {/* <div style={{ display: 'none' }}>
        <PrintableContent
          ref={componentRef}
          transactions={customerTransaction}
          customerInfo={{
            name: customerName,
            id: customerId,
          }}
          accountSummary={data?.accountSummary || []}
        />
      </div> */}
    </div>
  );
};

export default CustomerTransactions;
