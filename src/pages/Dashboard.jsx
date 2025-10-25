import { useState, useEffect } from 'react';
import {
  BsArrowUpRight,
  BsArrowDownLeft,
  BsPeople,
  BsCurrencyExchange,
  BsWallet2,
} from 'react-icons/bs';
import { Link } from 'react-router-dom';
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading
    setTimeout(() => {
      setStats({
        totalBalance: 1254300,
        dailyTransactions: 347,
        activeCustomers: 1284,
        monthlyRevenue: 85400,
      });
      setIsLoading(false);
    }, 1200);
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
    {
      currency: 'USD',
      amount: 450000,
      percentage: 36,
      color: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    },
    {
      currency: 'EUR',
      amount: 320000,
      percentage: 25,
      color: 'bg-gradient-to-r from-green-500 to-emerald-500',
    },
    {
      currency: 'AFN',
      amount: 280000,
      percentage: 22,
      color: 'bg-gradient-to-r from-purple-500 to-pink-500',
    },
    {
      currency: 'Others',
      amount: 204300,
      percentage: 17,
      color: 'bg-gradient-to-r from-orange-500 to-red-500',
    },
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
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 backdrop-blur-sm bg-white/70">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          {isLoading ? (
            <div className="h-8 bg-gray-200 rounded-lg animate-pulse mb-2"></div>
          ) : (
            <p className="text-2xl font-bold text-gray-900">
              ${value?.toLocaleString()}
            </p>
          )}
          {change && (
            <p
              className={`text-sm mt-1 flex items-center gap-1 ${
                change > 0 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              <span
                className={`inline-flex items-center ${
                  change > 0 ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {change > 0 ? '↗' : '↘'}
              </span>
              {Math.abs(change)}% {t('from last month')}
            </p>
          )}
        </div>
        <div
          className={`p-4 rounded-2xl ${color} group-hover:scale-110 transition-all duration-300 shadow-lg`}
        >
          {icon}
        </div>
      </div>
    </div>
  );

  const TransactionItem = ({ transaction }) => (
    <div className="flex items-center justify-between p-4 hover:bg-gray-50/80 rounded-xl transition-all duration-200 group hover:shadow-md border border-transparent hover:border-gray-200">
      <div className="flex items-center gap-4 flex-1">
        <div
          className={`p-3 rounded-xl transition-all duration-300 group-hover:scale-110 ${
            transaction.type === 'deposit'
              ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg'
              : transaction.type === 'withdrawal'
              ? 'bg-gradient-to-br from-red-500 to-pink-600 text-white shadow-lg'
              : transaction.type === 'transfer'
              ? 'bg-gradient-to-br from-blue-500 to-cyan-600 text-white shadow-lg'
              : 'bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-lg'
          }`}
        >
          {transaction.type === 'deposit' ? (
            <BsArrowDownLeft className="text-lg" />
          ) : transaction.type === 'withdrawal' ? (
            <BsArrowUpRight className="text-lg" />
          ) : transaction.type === 'transfer' ? (
            <FiActivity className="text-lg" />
          ) : (
            <BsCurrencyExchange className="text-lg" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 truncate">
            {transaction.customer}
          </p>
          <p className="text-sm text-gray-500 capitalize">{transaction.type}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-bold text-gray-900 text-lg">
          {transaction.amount.toLocaleString()} {transaction.currency}
        </p>
        <div className="flex items-center gap-2 text-sm mt-1">
          <span className="text-gray-500">{transaction.time}</span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              transaction.status === 'completed'
                ? 'bg-green-100 text-green-800 border border-green-200'
                : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
            }`}
          >
            {transaction.status}
          </span>
        </div>
      </div>
    </div>
  );

  const QuickActionButton = ({ icon, label, color, gradient }) => (
    <button
      className={`flex flex-col items-center justify-center p-5 rounded-2xl transition-all duration-300 group hover:shadow-xl hover:-translate-y-1 ${gradient}`}
    >
      <div
        className={`p-4 rounded-2xl mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg ${color}`}
      >
        {icon}
      </div>
      <span className="font-semibold text-white text-sm">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-emerald-50/20 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center p-6 rounded-3xl shadow-xl bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 drop-shadow-lg">
              {t('Dashboard')}
            </h1>
            <p className="text-white/90 font-medium text-lg">
              {t('به صرافی و خدمات پولی اکبریان خوش آمدید')}
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <StatCard
            title={t('Total Balance')}
            value={stats.totalBalance}
            icon={<BsWallet2 className="text-2xl text-white" />}
            change={12.5}
            color="bg-gradient-to-br from-blue-500 to-cyan-500"
          />
          <StatCard
            title={t('Daily Transactions')}
            value={stats.dailyTransactions}
            icon={<BsCurrencyExchange className="text-2xl text-white" />}
            change={8.3}
            color="bg-gradient-to-br from-green-500 to-emerald-500"
          />
          <StatCard
            title={t('Active Customers')}
            value={stats.activeCustomers}
            icon={<BsPeople className="text-2xl text-white" />}
            change={5.2}
            color="bg-gradient-to-br from-purple-500 to-pink-500"
          />
          <StatCard
            title={t('Monthly Revenue')}
            value={stats.monthlyRevenue}
            icon={<FiDollarSign className="text-2xl text-white" />}
            change={15.7}
            color="bg-gradient-to-br from-orange-500 to-red-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Enhanced Revenue Chart */}
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-gray-100/50 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                {t('Revenue Overview')}
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                {t('Monthly Revenue')}
              </div>
            </div>
            <RevenueChart data={revenueData} />
          </div>

          {/* Currency Distribution */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-gray-100/50 hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              {t('Currency Distribution')}
            </h3>
            <div className="space-y-5">
              {currencyDistribution.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between group hover:bg-gray-50/50 p-3 rounded-xl transition-all duration-200"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div
                      className={`w-4 h-4 rounded-full ${item.color} shadow-md`}
                    />
                    <div className="flex-1">
                      <span className="font-semibold text-gray-800">
                        {item.currency}
                      </span>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div
                          className={`h-2 rounded-full ${
                            item.color.split(' ')[0]
                          } transition-all duration-500`}
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900 text-lg">
                      ${item.amount.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
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
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-gray-100/50 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                {t('Recent Transactions')}
              </h3>
              <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-xl transition-all duration-200">
                {t('View All')} →
              </button>
            </div>
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <TransactionItem
                  key={transaction.id}
                  transaction={transaction}
                />
              ))}
            </div>
          </div>

          {/* Quick Actions & System Status */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-gray-100/50 hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                {t('Quick Actions')}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <Link to="/main/deposit">
                  <QuickActionButton
                    icon={<BsArrowDownLeft className="text-white text-xl" />}
                    label={t('Deposit')}
                    color="bg-gradient-to-br from-blue-500 to-cyan-500"
                    gradient="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 hover:from-blue-500/20 hover:to-cyan-500/20 border border-blue-200"
                  />
                </Link>
                <Link to="/main/withdraw">
                  <QuickActionButton
                    icon={<BsArrowUpRight className="text-white text-xl" />}
                    label={t('Withdraw')}
                    color="bg-gradient-to-br from-red-500 to-pink-500"
                    gradient="bg-gradient-to-br from-red-500/10 to-pink-500/10 hover:from-red-500/20 hover:to-pink-500/20 border border-red-200"
                  />
                </Link>
                <Link to="/rate/exchange">
                  <QuickActionButton
                    icon={<BsCurrencyExchange className="text-white text-xl" />}
                    label={t('Exchange')}
                    color="bg-gradient-to-br from-green-500 to-emerald-500"
                    gradient="bg-gradient-to-br from-green-500/10 to-emerald-500/10 hover:from-green-500/20 hover:to-emerald-500/20 border border-green-200"
                  />
                </Link>
                <Link to="main/transfer">
                  <QuickActionButton
                    icon={<FiActivity className="text-white text-xl" />}
                    label={t('Transfer')}
                    color="bg-gradient-to-br from-purple-500 to-pink-500"
                    gradient="bg-gradient-to-br from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 border border-purple-200"
                  />
                </Link>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-gray-100/50 hover:shadow-xl transition-all duration-300">
              <h4 className="font-bold text-gray-900 mb-6 text-lg">
                {t('System Status')}
              </h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 hover:bg-gray-50/50 rounded-xl transition-all duration-200">
                  <span className="text-gray-700 font-medium">
                    {t('API Connection')}
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold border border-green-200">
                    {t('Active')}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 hover:bg-gray-50/50 rounded-xl transition-all duration-200">
                  <span className="text-gray-700 font-medium">
                    {t('Database')}
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold border border-green-200">
                    {t('Online')}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 hover:bg-gray-50/50 rounded-xl transition-all duration-200">
                  <span className="text-gray-700 font-medium">
                    {t('Last Backup')}
                  </span>
                  <span className="text-gray-900 font-semibold text-sm bg-gray-100 px-3 py-1 rounded-full">
                    2 hours ago
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100/90 text-sm font-medium">
                  {t('Total Deposits Today')}
                </p>
                <p className="text-3xl font-bold mt-2">$84,250</p>
              </div>
              <BsArrowDownLeft className="text-3xl opacity-90" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100/90 text-sm font-medium">
                  {t('Total Withdrawals Today')}
                </p>
                <p className="text-3xl font-bold mt-2">$42,180</p>
              </div>
              <BsArrowUpRight className="text-3xl opacity-90" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100/90 text-sm font-medium">
                  {t('Exchange Rate Margin')}
                </p>
                <p className="text-3xl font-bold mt-2">2.4%</p>
              </div>
              <FiTrendingUp className="text-3xl opacity-90" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
