import { useState, useEffect } from 'react';
import {
  BsArrowUpRight,
  BsArrowDownLeft,
  BsPeople,
  BsCurrencyExchange,
  BsGraphUp,
  BsWallet2,
  BsClockHistory,
} from 'react-icons/bs';
import { FiDollarSign, FiTrendingUp, FiActivity } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import MChart from '../components/charts/MChart';
import RevenueChart from '../components/charts/RevenueChart';

const Dashboard = () => {
  const { t } = useTranslation();
  const [stats, setStats] = useState({
    totalBalance: 0,
    dailyTransactions: 0,
    activeCustomers: 0,
    monthlyRevenue: 0,
  });

  useEffect(() => {
    // Simulate API loading
    setTimeout(() => {
      setStats({
        totalBalance: 1254300,
        dailyTransactions: 347,
        activeCustomers: 1284,
        monthlyRevenue: 85400,
      });
    }, 1000);
  }, []);

  // Chart data
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [65000, 72000, 68000, 79000, 82000, 85400],
        borderColor: '#4f46e5',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const transactionData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Deposits',
        data: [45, 52, 38, 74, 65, 48, 32],
        backgroundColor: '#10b981',
      },
      {
        label: 'Withdrawals',
        data: [35, 42, 28, 54, 45, 38, 22],
        backgroundColor: '#ef4444',
      },
    ],
  };

  const currencyDistribution = [
    { currency: 'USD', amount: 450000, percentage: 36 },
    { currency: 'EUR', amount: 320000, percentage: 25 },
    { currency: 'AFN', amount: 280000, percentage: 22 },
    { currency: 'Others', amount: 204300, percentage: 17 },
  ];

  const recentTransactions = [
    {
      id: 1,
      customer: 'Ahmad Khan',
      type: 'deposit',
      amount: 5000,
      currency: 'USD',
      time: '2 min ago',
      status: 'completed',
    },
    {
      id: 2,
      customer: 'John Smith',
      type: 'withdrawal',
      amount: 3000,
      currency: 'EUR',
      time: '15 min ago',
      status: 'completed',
    },
    {
      id: 3,
      customer: 'Maria Garcia',
      type: 'transfer',
      amount: 7500,
      currency: 'USD',
      time: '1 hour ago',
      status: 'pending',
    },
    {
      id: 4,
      customer: 'Ali Hassan',
      type: 'deposit',
      amount: 12000,
      currency: 'AFN',
      time: '2 hours ago',
      status: 'completed',
    },
    {
      id: 5,
      customer: 'Sarah Johnson',
      type: 'exchange',
      amount: 4500,
      currency: 'EUR',
      time: '3 hours ago',
      status: 'completed',
    },
  ];

  const StatCard = ({ title, value, icon, change, color }) => (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">
            ${value?.toLocaleString()}
          </p>
          {change && (
            <p
              className={`text-sm mt-1 ${
                change > 0 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {change > 0 ? '↑' : '↓'} {Math.abs(change)}% from last month
            </p>
          )}
        </div>
        <div
          className={`p-3 rounded-xl ${color} group-hover:scale-110 transition-transform duration-300`}
        >
          {icon}
        </div>
      </div>
    </div>
  );

  const MiniChart = ({ data, color }) => (
    <div className="flex items-end h-8 gap-1">
      {data.map((value, index) => (
        <div
          key={index}
          className="w-2 bg-gradient-to-t from-gray-300 to-gray-400 rounded-t-sm transition-all duration-300 hover:opacity-80"
          style={{ height: `${(value / Math.max(...data)) * 100}%` }}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center p-3 rounded-2xl shadow-lg  bg-gradient-to-r from-green-600 to-emerald-400">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('Dashboard')}
          </h1>
          <p className="text-white font-bold">
            {t('به صرافی و خدمات پولی اکبریان خوش آمدید')}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title={t('Total Balance')}
            value={stats.totalBalance}
            icon={<BsWallet2 className="text-2xl text-white" />}
            change={12.5}
            color="bg-gradient-to-r from-blue-500 to-cyan-500"
          />
          <StatCard
            title={t('Daily Transactions')}
            value={stats.dailyTransactions}
            icon={<BsCurrencyExchange className="text-2xl text-white" />}
            change={8.3}
            color="bg-gradient-to-r from-green-500 to-emerald-500"
          />
          <StatCard
            title={t('Active Customers')}
            value={stats.activeCustomers}
            icon={<BsPeople className="text-2xl text-white" />}
            change={5.2}
            color="bg-gradient-to-r from-purple-500 to-pink-500"
          />
          <StatCard
            title={t('Monthly Revenue')}
            value={stats.monthlyRevenue}
            icon={<FiDollarSign className="text-2xl text-white" />}
            change={15.7}
            color="bg-gradient-to-r from-orange-500 to-red-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Enhanced Revenue Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {t('Revenue Overview')}
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                {t('Monthly Revenue')}
              </div>
            </div>
            <RevenueChart data={revenueData} />
          </div>

          {/* Currency Distribution */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              {t('Currency Distribution')}
            </h3>
            <div className="space-y-4">
              {currencyDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        index === 0
                          ? 'bg-blue-500'
                          : index === 1
                          ? 'bg-green-500'
                          : index === 2
                          ? 'bg-purple-500'
                          : 'bg-orange-500'
                      }`}
                    />
                    <span className="font-medium text-gray-700">
                      {item.currency}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">
                      ${item.amount.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      {item.percentage}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Recent Transactions */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {t('Recent Transactions')}
              </h3>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                {t('View All')}
              </button>
            </div>
            <div className="space-y-1">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-2 rounded-lg ${
                        transaction.type === 'deposit'
                          ? 'bg-green-100 text-green-600'
                          : transaction.type === 'withdrawal'
                          ? 'bg-red-100 text-red-600'
                          : transaction.type === 'transfer'
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-purple-100 text-purple-600'
                      }`}
                    >
                      {transaction.type === 'deposit' ? (
                        <BsArrowDownLeft />
                      ) : transaction.type === 'withdrawal' ? (
                        <BsArrowUpRight />
                      ) : transaction.type === 'transfer' ? (
                        <FiActivity />
                      ) : (
                        <BsCurrencyExchange />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {transaction.customer}
                      </p>
                      <p className="text-sm text-gray-500 capitalize">
                        {transaction.type}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {transaction.amount.toLocaleString()}{' '}
                      {transaction.currency}
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-500">{transaction.time}</span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          transaction.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              {t('Quick Actions')}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex flex-col items-center justify-center p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors duration-200 group">
                <div className="p-3 bg-blue-500 rounded-lg mb-2 group-hover:scale-110 transition-transform duration-300">
                  <BsArrowDownLeft className="text-white text-xl" />
                </div>
                <span className="font-medium text-gray-900">
                  {t('Deposit')}
                </span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 bg-red-50 hover:bg-red-100 rounded-xl transition-colors duration-200 group">
                <div className="p-3 bg-red-500 rounded-lg mb-2 group-hover:scale-110 transition-transform duration-300">
                  <BsArrowUpRight className="text-white text-xl" />
                </div>
                <span className="font-medium text-gray-900">
                  {t('Withdraw')}
                </span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors duration-200 group">
                <div className="p-3 bg-green-500 rounded-lg mb-2 group-hover:scale-110 transition-transform duration-300">
                  <BsCurrencyExchange className="text-white text-xl" />
                </div>
                <span className="font-medium text-gray-900">
                  {t('Exchange')}
                </span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors duration-200 group">
                <div className="p-3 bg-purple-500 rounded-lg mb-2 group-hover:scale-110 transition-transform duration-300">
                  <FiActivity className="text-white text-xl" />
                </div>
                <span className="font-medium text-gray-900">
                  {t('Transfer')}
                </span>
              </button>
            </div>

            {/* System Status */}
            <div className="mt-8">
              <h4 className="font-semibold text-gray-900 mb-4">
                {t('System Status')}
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">{t('API Connection')}</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    {t('Active')}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">{t('Database')}</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    {t('Online')}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">{t('Last Backup')}</span>
                  <span className="text-gray-900 text-sm">2 hours ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">{t('Total Deposits Today')}</p>
                <p className="text-2xl font-bold mt-1">$84,250</p>
              </div>
              <BsArrowDownLeft className="text-2xl" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">{t('Total Withdrawals Today')}</p>
                <p className="text-2xl font-bold mt-1">$42,180</p>
              </div>
              <BsArrowUpRight className="text-2xl" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">{t('Exchange Rate Margin')}</p>
                <p className="text-2xl font-bold mt-1">2.4%</p>
              </div>
              <FiTrendingUp className="text-2xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
