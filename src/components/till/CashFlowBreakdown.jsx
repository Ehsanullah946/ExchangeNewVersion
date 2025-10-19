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
} from 'react-icons/bs';

const CashFlowBreakdown = ({ cashFlow }) => {
  const { t } = useTranslation();
  if (!cashFlow) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Cash Flow Breakdown
        </h3>
        <div className="text-center text-gray-500 py-8">
          No transaction data available
        </div>
      </div>
    );
  }

  // ✅ FIXED: Use correct property names from backend
  const {
    deposits = { amount: 0, count: 0 },
    withdrawals = { amount: 0, count: 0 },
    receives = { amount: 0, count: 0 },
    transfers = { amount: 0, count: 0 },
    exchangeSales = { amount: 0, count: 0 },
    exchangePurchases = { amount: 0, count: 0 },
  } = cashFlow;

  const flowItems = [
    {
      type: 'deposit',
      title: 'Deposits',
      amount: parseFloat(deposits.amount) || 0,
      count: deposits.count || 0,
      icon: <BsArrowDownLeft className="text-green-600" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      type: 'withdraw',
      title: 'Withdrawals',
      amount: parseFloat(withdrawals.amount) || 0,
      count: withdrawals.count || 0,
      icon: <BsArrowUpRight className="text-red-600" />,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      type: 'receive',
      title: 'Receives',
      amount: parseFloat(receives.amount) || 0,
      count: receives.count || 0,
      icon: <BsReceipt className="text-blue-600" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      type: 'transfer',
      title: 'Transfers',
      amount: parseFloat(transfers.amount) || 0,
      count: transfers.count || 0,
      icon: <BsSend className="text-orange-600" />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      type: 'exchange_sale',
      title: 'Exchange Sales',
      amount: parseFloat(exchangeSales.amount) || 0,
      count: exchangeSales.count || 0,
      icon: <BsCashStack className="text-purple-600" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      type: 'exchange_purchase',
      title: 'Exchange Purchases',
      amount: parseFloat(exchangePurchases.amount) || 0,
      count: exchangePurchases.count || 0,
      icon: <BsArrowLeftRight className="text-indigo-600" />,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          {t('Cash Flow Breakdown')}
        </h3>
        {cashFlow.summary && (
          <div className="text-sm text-gray-600">
            Net: $
            {(
              cashFlow.summary.totalIn - cashFlow.summary.totalOut
            ).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {flowItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${item.bgColor}`}>
                {item.icon}
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{item.title}</h4>
                <p className="text-sm text-gray-500">
                  {item.count} transaction{item.count !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            <div className={`text-right ${item.color}`}>
              <p className="font-semibold">
                $
                {item.amount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Section */}
      {cashFlow.summary && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-green-600 font-medium">Total In</p>
              <p className="text-lg font-bold text-green-700">
                $
                {cashFlow.summary.totalIn.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <p className="text-sm text-red-600 font-medium">Total Out</p>
              <p className="text-lg font-bold text-red-700">
                $
                {cashFlow.summary.totalOut.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CashFlowBreakdown;
