// components/salary/SalarySummary.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  BsCurrencyExchange,
  BsCheckCircle,
  BsClock,
  BsXCircle,
} from 'react-icons/bs';
import { formatNumber } from '../../utils/formatNumber';

const SalarySummary = ({ summary }) => {
  const { t } = useTranslation();

  const statusItems = [
    {
      status: 'paid',
      count: summary.byStatus?.paid || 0,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      icon: BsCheckCircle,
    },
    {
      status: 'pending',
      count: summary.byStatus?.pending || 0,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      icon: BsClock,
    },
    {
      status: 'cancelled',
      count: summary.byStatus?.cancelled || 0,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      icon: BsXCircle,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                Total Gross
              </p>
              <p className="text-2xl font-bold text-blue-800 mt-1">
                ${formatNumber(summary.totalGross || 0)}
              </p>
            </div>
            <div className="p-3 bg-blue-500 rounded-2xl text-white">
              <BsCurrencyExchange className="text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-green-600 uppercase tracking-wide">
                Total Net
              </p>
              <p className="text-2xl font-bold text-green-800 mt-1">
                ${formatNumber(summary.totalNet || 0)}
              </p>
            </div>
            <div className="p-3 bg-green-500 rounded-2xl text-white">
              <BsCheckCircle className="text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-2xl p-6 border border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-red-600 uppercase tracking-wide">
                Total Tax
              </p>
              <p className="text-2xl font-bold text-red-800 mt-1">
                ${formatNumber(summary.totalTax || 0)}
              </p>
            </div>
            <div className="p-3 bg-red-500 rounded-2xl text-white">
              <BsXCircle className="text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-2xl p-6 border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-purple-600 uppercase tracking-wide">
                Total Bonus
              </p>
              <p className="text-2xl font-bold text-purple-800 mt-1">
                ${formatNumber(summary.totalBonus || 0)}
              </p>
            </div>
            <div className="p-3 bg-purple-500 rounded-2xl text-white">
              <BsCurrencyExchange className="text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Status */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Payment Status
          </h3>
          <div className="space-y-3">
            {statusItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className={`flex items-center justify-between p-4 rounded-xl border ${item.borderColor} ${item.bgColor}`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`text-xl ${item.color}`} />
                    <span className="font-semibold text-gray-700 capitalize">
                      {item.status}
                    </span>
                  </div>
                  <span className={`text-lg font-bold ${item.color}`}>
                    {item.count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Currency Breakdown */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Currency Breakdown
          </h3>
          <div className="space-y-3">
            {Object.entries(summary.byMoneyType || {}).map(
              ([currency, data], index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200"
                >
                  <div className="flex items-center gap-3">
                    <BsCurrencyExchange className="text-xl text-blue-600" />
                    <span className="font-semibold text-gray-700">
                      {currency}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-blue-800">
                      ${formatNumber(data.totalNet)}
                    </p>
                    <p className="text-sm text-blue-600">
                      {data.count} employee{data.count !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
              )
            )}
            {Object.keys(summary.byMoneyType || {}).length === 0 && (
              <div className="text-center py-4 text-gray-500">
                No salary data available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalarySummary;
