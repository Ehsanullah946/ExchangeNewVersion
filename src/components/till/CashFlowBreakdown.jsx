// components/till/CashFlowBreakdown.jsx
import React from 'react';

const CashFlowBreakdown = ({ cashFlow }) => {
  if (!cashFlow) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Cash Flow Breakdown
        </h3>
        <div className="text-center text-gray-500 py-4">
          No cash flow data available
        </div>
      </div>
    );
  }

  const flowItems = [
    {
      type: 'deposits',
      label: 'Deposits',
      amount: cashFlow.deposits?.amount || '0.00',
      count: cashFlow.deposits?.count || 0,
      color: 'bg-green-100 text-green-800',
      icon: '↓',
    },
    {
      type: 'withdrawals',
      label: 'Withdrawals',
      amount: cashFlow.withdrawals?.amount || '0.00',
      count: cashFlow.withdrawals?.count || 0,
      color: 'bg-red-100 text-red-800',
      icon: '↑',
    },
    {
      type: 'exchangesIn',
      label: 'Exchanges In',
      amount: cashFlow.exchangesIn?.amount || '0.00',
      count: cashFlow.exchangesIn?.count || 0,
      color: 'bg-blue-100 text-blue-800',
      icon: '↘',
    },
    {
      type: 'exchangesOut',
      label: 'Exchanges Out',
      amount: cashFlow.exchangesOut?.amount || '0.00',
      count: cashFlow.exchangesOut?.count || 0,
      color: 'bg-orange-100 text-orange-800',
      icon: '↗',
    },
  ];

  // Filter out items with zero transactions for cleaner display
  const activeFlowItems = flowItems.filter((item) => item.count > 0);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Cash Flow Breakdown
      </h3>
      <div className="space-y-4">
        {activeFlowItems.length > 0 ? (
          activeFlowItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${item.color} font-bold`}
                >
                  {item.icon}
                </span>
                <div>
                  <p className="font-medium text-gray-900">{item.label}</p>
                  <p className="text-sm text-gray-500">
                    {item.count} transaction{item.count !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">
                  $
                  {parseFloat(item.amount).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-4">
            No transactions today
          </div>
        )}
      </div>
    </div>
  );
};

export default CashFlowBreakdown;
