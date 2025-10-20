// components/till/CashFlowBreakdown.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  BsArrowDownLeft,
  BsArrowUpRight,
  BsCashStack,
  BsSend,
  BsArrowLeftRight,
  BsReceipt,
  BsCurrencyExchange,
} from 'react-icons/bs';
import { formatNumber } from '../../utils/formatNumber';

const CashFlowBreakdown = ({ cashFlow, isMultiCurrency = false }) => {
  const { t } = useTranslation();

  if (!cashFlow) {
    return (
      <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-200/60 backdrop-blur-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <div className="w-2 h-6 bg-green-500 rounded-full"></div>
          {t('Cash Flow Breakdown')}
        </h3>
        <div className="text-center text-gray-500 py-12">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BsCashStack className="text-3xl text-gray-400" />
          </div>
          <p className="text-lg">{t('No transaction data available')}</p>
        </div>
      </div>
    );
  }

  // Handle multi-currency data structure
  const getFlowItems = (currencyData) => {
    const {
      deposits = { amount: 0, count: 0 },
      withdrawals = { amount: 0, count: 0 },
      receives = { amount: 0, count: 0 },
      transfers = { amount: 0, count: 0 },
      exchangeSales = { amount: 0, count: 0 },
      exchangePurchases = { amount: 0, count: 0 },
    } = currencyData;

    return [
      {
        type: 'deposit',
        title: `${t('Deposit')}`,
        amount: formatNumber(deposits.amount) || 0,
        count: deposits.count || 0,
        icon: <BsArrowDownLeft className="text-2xl" />,
        color: 'text-green-600',
        bgColor: 'bg-gradient-to-br from-green-500 to-emerald-500',
        cardBg: 'from-green-50 to-emerald-50 border-green-200',
      },
      {
        type: 'withdraw',
        title: `${t('Withdraw')}`,
        amount: formatNumber(withdrawals.amount) || 0,
        count: withdrawals.count || 0,
        icon: <BsArrowUpRight className="text-2xl" />,
        color: 'text-red-600',
        bgColor: 'bg-gradient-to-br from-red-500 to-rose-500',
        cardBg: 'from-red-50 to-rose-50 border-red-200',
      },
      {
        type: 'receive',
        title: `${t('Receive')}`,
        amount: formatNumber(receives.amount) || 0,
        count: receives.count || 0,
        icon: <BsReceipt className="text-2xl" />,
        color: 'text-blue-600',
        bgColor: 'bg-gradient-to-br from-blue-500 to-cyan-500',
        cardBg: 'from-blue-50 to-cyan-50 border-blue-200',
      },
      {
        type: 'transfer',
        title: `${t('Send')}`,
        amount: formatNumber(transfers.amount) || 0,
        count: transfers.count || 0,
        icon: <BsSend className="text-2xl" />,
        color: 'text-orange-600',
        bgColor: 'bg-gradient-to-br from-orange-500 to-amber-500',
        cardBg: 'from-orange-50 to-amber-50 border-orange-200',
      },
      {
        type: 'exchange_sale',
        title: `${t('Exchange Sales')}`,
        amount: formatNumber(exchangeSales.amount) || 0,
        count: exchangeSales.count || 0,
        icon: <BsCashStack className="text-2xl" />,
        color: 'text-purple-600',
        bgColor: 'bg-gradient-to-br from-purple-500 to-violet-500',
        cardBg: 'from-purple-50 to-violet-50 border-purple-200',
      },
      {
        type: 'exchange_purchase',
        title: `${t('Exchange Purchase')}`,
        amount: formatNumber(exchangePurchases.amount) || 0,
        count: exchangePurchases.count || 0,
        icon: <BsArrowLeftRight className="text-2xl" />,
        color: 'text-indigo-600',
        bgColor: 'bg-gradient-to-br from-indigo-500 to-blue-500',
        cardBg: 'from-indigo-50 to-blue-50 border-indigo-200',
      },
    ];
  };

  // Calculate summary for multi-currency view
  const calculateMultiCurrencySummary = () => {
    let totalIn = 0;
    let totalOut = 0;

    Object.values(cashFlow).forEach((currencyData) => {
      if (currencyData && currencyData.summary) {
        totalIn += currencyData.summary.totalIn;
        totalOut += currencyData.summary.totalOut;
      }
    });

    return { totalIn, totalOut };
  };

  const summary = isMultiCurrency
    ? calculateMultiCurrencySummary()
    : cashFlow.summary;

  const flowItems = isMultiCurrency
    ? [] // Don't show individual items in multi-currency view
    : getFlowItems(cashFlow);

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-200/60 backdrop-blur-sm">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <div className="w-2 h-6 bg-green-500 rounded-full"></div>
          {isMultiCurrency
            ? t('Multi-Currency Cash Flow')
            : t('Cash Flow Breakdown')}
        </h3>
        {summary && (
          <div className="text-lg font-bold text-gray-700 bg-gradient-to-r from-gray-50 to-slate-50 px-4 py-2 rounded-2xl border border-gray-200">
            {t('Net')}: ${formatNumber(summary.totalIn - summary.totalOut)}
          </div>
        )}
      </div>

      {isMultiCurrency ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(cashFlow).map(
              ([currencyName, currencyData], index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-blue-500 rounded-2xl text-white">
                      <BsCurrencyExchange className="text-xl" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">
                        {currencyName}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {Object.values(currencyData).reduce(
                          (total, item) => total + (item?.count || 0),
                          0
                        )}{' '}
                        transactions
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-green-50 rounded-xl border border-green-200">
                      <p className="text-sm text-green-700 font-semibold">In</p>
                      <p className="text-lg font-bold text-green-800">
                        ${formatNumber(currencyData.summary?.totalIn || 0)}
                      </p>
                    </div>
                    <div className="text-center p-3 bg-red-50 rounded-xl border border-red-200">
                      <p className="text-sm text-red-700 font-semibold">Out</p>
                      <p className="text-lg font-bold text-red-800">
                        ${formatNumber(currencyData.summary?.totalOut || 0)}
                      </p>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {flowItems.map((item, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r ${item.cardBg} border rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group backdrop-blur-sm`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-3 rounded-2xl ${item.bgColor} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-600 font-medium">
                        {item.count} {t('transaction')}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold text-2xl ${item.color}`}>
                      $
                      {item.amount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {summary && (
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h4 className="text-lg font-bold text-gray-900 mb-6 text-center">
                {t('Summary')}
              </h4>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200 shadow-lg">
                  <p className="text-sm text-green-700 font-semibold uppercase tracking-wide mb-2">
                    {t('Total In')}
                  </p>
                  <p className="text-3xl font-bold text-green-800">
                    ${formatNumber(summary.totalIn)}
                  </p>
                </div>
                <div className="text-center p-6 bg-gradient-to-r from-red-50 to-rose-50 rounded-2xl border border-red-200 shadow-lg">
                  <p className="text-sm text-red-700 font-semibold uppercase tracking-wide mb-2">
                    {t('Total Out')}
                  </p>
                  <p className="text-3xl font-bold text-red-800">
                    ${formatNumber(summary.totalOut)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CashFlowBreakdown;
