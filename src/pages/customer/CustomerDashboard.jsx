import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  BsWallet2,
  BsArrowUpCircle,
  BsArrowDownCircle,
  BsClockHistory,
  BsGraphUp,
  BsCreditCard,
  BsPerson,
  BsShieldCheck,
  BsBell,
  BsStar,
  BsCurrencyExchange,
  BsPiggyBank,
  BsArrowRight,
  BsEye,
  BsDownload,
  BsUpload,
} from 'react-icons/bs';

const CustomerDashboard = () => {
  const { t } = useTranslation();

  // Mock data - replace with actual API calls
  const customerData = {
    account: {
      balance: 12500.75,
      currency: 'USD',
      accountNumber: 'ACC-7843-2291',
      status: 'Active',
    },
    recentTransactions: [
      {
        id: 1,
        type: 'deposit',
        amount: 2500,
        date: '2024-01-15',
        description: 'Salary Deposit',
        status: 'completed',
      },
      {
        id: 2,
        type: 'withdrawal',
        amount: -500,
        date: '2024-01-14',
        description: 'ATM Withdrawal',
        status: 'completed',
      },
      {
        id: 3,
        type: 'transfer',
        amount: -1200,
        date: '2024-01-13',
        description: 'Bill Payment',
        status: 'completed',
      },
      {
        id: 4,
        type: 'deposit',
        amount: 800,
        date: '2024-01-12',
        description: 'Freelance Payment',
        status: 'pending',
      },
    ],
    quickStats: {
      totalDeposits: 3300,
      totalWithdrawals: 1700,
      monthlyGrowth: 12.5,
      transactionsCount: 47,
    },
    notifications: [
      {
        id: 1,
        type: 'info',
        message: 'Your account verification is complete',
        time: '2 hours ago',
      },
      {
        id: 2,
        type: 'success',
        message: 'Deposit of $2,500 received',
        time: '1 day ago',
      },
      {
        id: 3,
        type: 'warning',
        message: 'Low balance alert',
        time: '3 days ago',
      },
    ],
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: customerData.account.currency,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'deposit':
        return <BsDownload className="text-green-500" />;
      case 'withdrawal':
        return <BsUpload className="text-red-500" />;
      case 'transfer':
        return <BsArrowRight className="text-blue-500" />;
      default:
        return <BsCurrencyExchange className="text-gray-500" />;
    }
  };

  const getTransactionColor = (type) => {
    switch (type) {
      case 'deposit':
        return 'text-green-600';
      case 'withdrawal':
        return 'text-red-600';
      case 'transfer':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'info':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
                {t('Welcome back,')}{' '}
                <span className="text-blue-600">John Doe!</span>
              </h1>
              <p className="text-gray-600 mt-2 text-lg">
                {t("Here's your financial overview for today")}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg">
                JD
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">John Doe</p>
                <p className="text-sm text-gray-500">
                  {customerData.account.accountNumber}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Account Balance Card */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-6 text-white shadow-2xl">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    {t('Total Balance')}
                  </h2>
                  <p className="text-blue-100">
                    {customerData.account.accountNumber}
                  </p>
                </div>
                <div className="bg-white/20 rounded-xl p-2">
                  <BsWallet2 className="text-2xl" />
                </div>
              </div>

              <div className="mb-2">
                <p className="text-4xl lg:text-5xl font-bold mb-2">
                  {formatCurrency(customerData.account.balance)}
                </p>
                <div className="flex items-center gap-2">
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                    {t('Active')}
                  </span>
                  <span className="text-blue-100 text-sm">
                    {customerData.account.currency}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-2">
            <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <BsArrowUpCircle className="text-green-600 text-xl" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">{t('Total Deposits')}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(customerData.quickStats.totalDeposits)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 ">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <BsArrowDownCircle className="text-red-600 text-xl" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">
                    {t('Total Withdrawals')}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(customerData.quickStats.totalWithdrawals)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <BsGraphUp className="text-blue-600 text-xl" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">{t('Monthly Growth')}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    +{customerData.quickStats.monthlyGrowth}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Transactions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <BsClockHistory className="text-blue-500" />
                  {t('Recent Transactions')}
                </h3>
                <Link
                  to="/customer/transactions"
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
                >
                  {t('View All')}
                  <BsArrowRight />
                </Link>
              </div>

              <div className="space-y-2">
                {customerData.recentTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-2 border border-gray-100 rounded-xl hover:bg-gray-50 transition-all duration-200"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                        {getTransactionIcon(transaction.type)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {transaction.description}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatDate(transaction.date)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-bold ${getTransactionColor(
                          transaction.type
                        )}`}
                      >
                        {transaction.amount > 0 ? '+' : ''}
                        {formatCurrency(transaction.amount)}
                      </p>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          transaction.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Notifications & Quick Actions */}
          <div className="space-y-6">
            {/* Notifications */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-4">
                <BsBell className="text-orange-500" />
                {t('Notifications')}
              </h3>
              <div className="space-y-3">
                {customerData.notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-xl border text-sm ${getNotificationColor(
                      notification.type
                    )}`}
                  >
                    <p className="font-medium">{notification.message}</p>
                    <p className="text-xs opacity-75 mt-1">
                      {notification.time}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Features Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-4">
              <BsShieldCheck className="text-3xl" />
              <div>
                <h4 className="font-bold text-lg">{t('Account Security')}</h4>
                <p className="text-green-100 text-sm">
                  {t('Your account is protected')}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-4">
              <BsCreditCard className="text-3xl" />
              <div>
                <h4 className="font-bold text-lg">{t('Virtual Card')}</h4>
                <p className="text-blue-100 text-sm">
                  {t('Get your digital card')}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-4">
              <BsEye className="text-3xl" />
              <div>
                <h4 className="font-bold text-lg">{t('24/7 Support')}</h4>
                <p className="text-purple-100 text-sm">
                  {t("We're here to help")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
