import React from 'react';
import { useUpdateTillTotals, useTodayTill } from '../../hooks/useTillQueries';
import {
  BsWallet2,
  BsArrowUpRight,
  BsArrowDownLeft,
  BsCashCoin,
} from 'react-icons/bs';
import { FiRefreshCw } from 'react-icons/fi';

const TillStats = () => {
  // Fetch today's till data directly from the backend
  const { data: todayTill, isLoading, isError } = useTodayTill();
  const updateTotalsMutation = useUpdateTillTotals();

  const handleUpdateTotals = () => {
    updateTotalsMutation.mutate();
  };

  if (isLoading) return <p>Loading till data...</p>;
  if (isError) return <p className="text-red-500">Failed to load till data.</p>;
  if (!todayTill) return <p>No till record found for today.</p>;

  const stats = [
    {
      title: 'Opening Balance',
      value: todayTill?.openingBalance || 0,
      icon: <BsWallet2 className="text-2xl text-blue-600" />,
      color: 'bg-blue-50 border-blue-200',
    },
    {
      title: 'Total Cash In',
      value: todayTill?.totalIn || 0,
      icon: <BsArrowDownLeft className="text-2xl text-green-600" />,
      color: 'bg-green-50 border-green-200',
    },
    {
      title: 'Total Cash Out',
      value: todayTill?.totalOut || 0,
      icon: <BsArrowUpRight className="text-2xl text-red-600" />,
      color: 'bg-red-50 border-red-200',
    },
    {
      title: 'Closing Balance',
      value: todayTill?.closingBalance || 0,
      icon: <BsCashCoin className="text-2xl text-purple-600" />,
      color: 'bg-purple-50 border-purple-200',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`bg-white rounded-2xl p-6 shadow-lg border-2 ${stat.color} transition-all duration-300 hover:shadow-xl`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                {stat.title}
              </p>
              <p className="text-2xl font-bold text-gray-900">
                $
                {parseFloat(stat.value).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-white shadow-sm">{stat.icon}</div>
          </div>
        </div>
      ))}

      {/* Update Button */}
      <div className="lg:col-span-4 flex justify-end">
        <button
          onClick={handleUpdateTotals}
          disabled={updateTotalsMutation.isPending}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
        >
          <FiRefreshCw
            className={`${
              updateTotalsMutation.isPending ? 'animate-spin' : ''
            }`}
          />
          {updateTotalsMutation.isPending ? 'Updating...' : 'Update Totals'}
        </button>
      </div>
    </div>
  );
};

export default TillStats;
