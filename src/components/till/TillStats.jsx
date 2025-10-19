// components/till/TillStats.jsx
import React from 'react';
import {
  BsWallet2,
  BsArrowUpRight,
  BsArrowDownLeft,
  BsCashCoin,
} from 'react-icons/bs';
import { FiRefreshCw } from 'react-icons/fi';
import { useUpdateTillTotals } from '../../hooks/useTillQueries';
import { useTranslation } from 'react-i18next';
import { formatNumber } from '../../utils/formatNumber';

const TillStats = ({ todayTill }) => {
  const updateTotalsMutation = useUpdateTillTotals();
  const { t } = useTranslation();

  const stats = [
    {
      title: 'Opening Balance',
      value: todayTill?.openingBalance || '0.00',
      icon: <BsWallet2 className="text-xl" />,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      borderColor: 'border-blue-200',
    },
    {
      title: 'Total Cash In',
      value: todayTill?.totalIn || '0.00',
      icon: <BsArrowDownLeft className="text-xl" />,
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50',
      borderColor: 'border-green-200',
    },
    {
      title: 'Total Cash Out',
      value: todayTill?.totalOut || '0.00',
      icon: <BsArrowUpRight className="text-xl" />,
      gradient: 'from-red-500 to-rose-500',
      bgGradient: 'from-red-50 to-rose-50',
      borderColor: 'border-red-200',
    },
    {
      title: 'Closing Balance',
      value: todayTill?.closingBalance || '0.00',
      icon: <BsCashCoin className="text-xl" />,
      gradient: 'from-purple-500 to-violet-500',
      bgGradient: 'from-purple-50 to-violet-50',
      borderColor: 'border-purple-200',
    },
  ];

  const handleUpdateTotals = () => {
    updateTotalsMutation.mutate();
  };

  if (!todayTill) {
    return (
      <div className="text-center text-gray-500 py-12 bg-white rounded-3xl shadow-xl border border-gray-200">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <BsWallet2 className="text-3xl text-gray-400" />
        </div>
        <p className="text-lg font-medium">No till record found for today.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`bg-gradient-to-r ${stat.bgGradient} border ${stat.borderColor} rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 backdrop-blur-sm`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  $
                  {formatNumber(stat.value).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
              <div
                className={`p-4 rounded-2xl bg-gradient-to-r ${stat.gradient} text-white shadow-lg`}
              >
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end mb-8">
        <button
          onClick={handleUpdateTotals}
          disabled={updateTotalsMutation.isPending}
          className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
        >
          <FiRefreshCw
            className={`text-lg ${
              updateTotalsMutation.isPending ? 'animate-spin' : ''
            }`}
          />
          {updateTotalsMutation.isPending
            ? 'Updating...'
            : `${t('Update Totals')}`}
        </button>
      </div>
    </>
  );
};

export default TillStats;
