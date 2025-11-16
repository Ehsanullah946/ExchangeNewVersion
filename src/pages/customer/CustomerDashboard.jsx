import React from 'react';
import { useCustomerTransactionsTotal } from '../../hooks/useCustomerAuth';
import {
  BsWallet2,
  BsArrowUpCircle,
  BsArrowDownCircle,
  BsGraphUp,
  BsStarFill,
  BsCurrencyDollar,
  BsCashCoin,
  BsArrowLeftRight,
  BsPerson,
  BsClock,
  BsPieChart,
  BsArrowUpRight,
  BsArrowDownLeft,
  BsShieldCheck,
  BsFlag,
  BsCalculator,
} from 'react-icons/bs';
import { useTranslation } from 'react-i18next';

const CustomerDashboard = () => {
  const { t } = useTranslation();
  const { data: accountTotal } = useCustomerTransactionsTotal();

  console.log('customer account total', accountTotal);

  // Format currency function
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US').format(amount || 0);
  };

  // Get transaction type icon and color
  const getTransactionConfig = (type) => {
    const config = {
      deposit: {
        icon: <BsArrowDownLeft className="text-xl" />,
        color: 'from-blue-500 to-cyan-500',
        bgColor: 'bg-blue-50',
        textColor: 'text-blue-700',
      },
      withdraw: {
        icon: <BsArrowUpRight className="text-xl" />,
        color: 'from-red-500 to-pink-500',
        bgColor: 'bg-red-50',
        textColor: 'text-red-700',
      },
      receive: {
        icon: <BsArrowDownCircle className="text-xl" />,
        color: 'from-green-500 to-emerald-500',
        bgColor: 'bg-green-50',
        textColor: 'text-green-700',
      },
      transfer: {
        icon: <BsArrowLeftRight className="text-xl" />,
        color: 'from-orange-500 to-amber-500',
        bgColor: 'bg-orange-50',
        textColor: 'text-orange-700',
      },
      exchange: {
        icon: <BsCashCoin className="text-xl" />,
        color: 'from-purple-500 to-indigo-500',
        bgColor: 'bg-purple-50',
        textColor: 'text-purple-700',
      },
    };
    return (
      config[t(type)] || {
        icon: <BsPieChart className="text-xl" />,
        color: 'from-gray-500 to-slate-500',
        bgColor: 'bg-gray-50',
        textColor: 'text-gray-700',
      }
    );
  };

  const getCurrencyFlag = (currency) => {
    const flags = {
      AFG: '🇦🇫',
      USD: '🇺🇸',
      EUR: '🇪🇺',
      GBP: '🇬🇧',
    };
    return flags[currency] || '💳';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-6 md:p-8 mb-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 md:gap-6">
              <div className="relative">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-xl md:text-2xl font-bold shadow-lg">
                  {accountTotal?.customer?.firstName?.charAt(0)}
                  {accountTotal?.customer?.lastName?.charAt(0)}
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <BsShieldCheck className="text-white text-xs" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
                  {t('Welcome')}, {accountTotal?.customer?.name}!
                </h1>
                <p className="text-gray-600 mt-1 flex items-center gap-2">
                  <BsPerson className="text-gray-400" />
                  {t('Customer ID')}: {accountTotal?.customer?.id}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-3 rounded-2xl shadow-lg">
              <BsClock className="text-lg" />
              <span className="font-semibold">{t('All Time Period')}</span>
            </div>
          </div>
        </div>

        {/* Enhanced Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Net Cash Flow */}
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wide mb-2">
                  {t('Net Cash Flow')}
                </h3>
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  {formatCurrency(accountTotal?.totals?.overall?.netFlow)}
                </div>
                <div
                  className={`text-sm font-medium ${
                    accountTotal?.totals?.overall?.netFlow >= 0
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {accountTotal?.totals?.overall?.netFlow >= 0 ? '+' : ''}
                  {formatCurrency(
                    accountTotal?.totals?.overall?.calculatedBalance
                  )}
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                <BsGraphUp className="text-xl" />
              </div>
            </div>
          </div>

          {/* Total Incoming */}
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wide mb-2">
                  {t('Total Incoming')}
                </h3>
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  {formatCurrency(accountTotal?.totals?.overall?.totalIncoming)}
                </div>
                <div className="text-gray-600 text-sm">
                  {accountTotal?.summary?.totalTransactions || 0}{' '}
                  {t('Transaction')}
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                <BsArrowDownCircle className="text-xl" />
              </div>
            </div>
          </div>

          {/* Most Active */}
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wide mb-2">
                  {t('Most Active')}
                </h3>
                <div className="text-xl font-bold text-gray-800 mb-1 capitalize">
                  {`${t(accountTotal?.summary?.mostActiveType?.type)}` || 'N/A'}
                </div>
                <div className="text-gray-600 text-sm">
                  {formatCurrency(
                    accountTotal?.summary?.mostActiveType?.amount || 0
                  )}
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                <BsStarFill className="text-xl" />
              </div>
            </div>
          </div>

          {/* Largest Transaction */}
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wide mb-2">
                  {t('Largest Transaction')}
                </h3>
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  {formatCurrency(
                    accountTotal?.summary?.largestTransaction?.amount || 0
                  )}
                </div>
                <div className="text-gray-600 text-sm capitalize">
                  {`${t(accountTotal?.summary?.largestTransaction?.type)}` ||
                    'N/A'}
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                <BsCurrencyDollar className="text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Transaction Types Breakdown */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-6 md:p-8 mb-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent flex items-center gap-3">
              <BsPieChart className="text-blue-500" />
              {t('Transaction Summary')}
            </h2>
            <div className="text-sm text-gray-500 flex items-center gap-2">
              <BsClock className="text-gray-400" />
              {t('Real-time data')}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-3 xl:grid-cols-5 gap-4 md:gap-6">
            {Object.entries(accountTotal?.totals || {}).map(([key, value]) => {
              if (key === 'overall') return null;
              const config = getTransactionConfig(value?.type);

              return (
                <div
                  key={key}
                  className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl p-5 border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl ${config.bgColor} flex items-center justify-center ${config.textColor}`}
                    >
                      {config.icon}
                    </div>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${config.bgColor} ${config.textColor}`}
                    >
                      {value?.count || 0}
                    </span>
                  </div>

                  <h3 className="font-bold text-gray-800 capitalize mb-4 text-sm">
                    {`${t(value?.type)}`}
                  </h3>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-xs">
                        {t('Total')}
                      </span>
                      <span className="font-bold text-gray-800 text-sm">
                        {formatCurrency(
                          value?.total || value?.netExchange || 0
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-xs">
                        {t('Average')}
                      </span>
                      <span className="font-semibold text-gray-800 text-sm">
                        {value?.average ? formatCurrency(value.average) : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Enhanced Bottom Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Currency Breakdown */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-6 md:p-8">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent flex items-center gap-3 mb-8">
              <BsFlag className="text-green-500" />
              {t('Currency Breakdown')}
            </h2>

            <div className="space-y-4">
              {Object.entries(accountTotal?.currencyBreakdown || {}).map(
                ([currency, data]) => (
                  <div
                    key={currency}
                    className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl p-5 border border-gray-100 hover:border-green-200 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">
                          {getCurrencyFlag(currency)}
                        </span>
                        <h3 className="font-bold text-gray-800 text-lg">
                          {currency}
                        </h3>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">
                          {t('Net Flow')}
                        </div>
                        <div
                          className={`font-bold ${
                            data?.deposits +
                              data?.receives -
                              (data?.withdraws + data?.transfers) >=
                            0
                              ? 'text-green-600'
                              : 'text-red-600'
                          }`}
                        >
                          {formatCurrency(
                            data?.deposits +
                              data?.receives -
                              (data?.withdraws + data?.transfers)
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                      <div className="flex flex-col">
                        <span className="text-gray-600 text-xs">
                          {t('Deposit')}
                        </span>
                        <span className="font-semibold text-blue-600">
                          {formatCurrency(data?.deposits)}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-gray-600 text-xs">
                          {t('Withdraw')}
                        </span>
                        <span className="font-semibold text-red-600">
                          {formatCurrency(data?.withdraws)}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-gray-600 text-xs">
                          {t('Receive')}
                        </span>
                        <span className="font-semibold text-green-600">
                          {formatCurrency(data?.receives)}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-gray-600 text-xs">
                          {t('Send')}
                        </span>
                        <span className="font-semibold text-orange-600">
                          {formatCurrency(data?.transfers)}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-gray-600 text-xs">
                          {t('Sales')}
                        </span>
                        <span className="font-semibold text-purple-600">
                          {formatCurrency(data?.exchangeSales)}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-gray-600 text-xs">
                          {t('Purchases')}
                        </span>
                        <span className="font-semibold text-indigo-600">
                          {formatCurrency(data?.exchangePurchases)}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Enhanced Balance Summary */}
          <div className="space-y-6">
            {/* Main Balance Card */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-6 md:p-8 text-white shadow-2xl">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
                    <BsWallet2 className="text-blue-200" />
                    {t('Balance Overview')}
                  </h2>
                  <p className="text-blue-200 text-sm">
                    {t('Current financial position')}
                  </p>
                </div>
                <div className="bg-white/20 rounded-xl p-2">
                  <BsCalculator className="text-2xl" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-blue-500/30">
                  <span className="text-blue-200">{t('Initial Balance')}</span>
                  <span className="text-xl font-bold">
                    {formatCurrency(
                      accountTotal?.totals?.overall?.initialBalance
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-blue-500/30">
                  <span className="text-blue-200">
                    {t('Calculated Balance')}
                  </span>
                  <span className="text-xl font-bold text-green-300">
                    {formatCurrency(
                      accountTotal?.totals?.overall?.calculatedBalance
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-200">{t('Actual Balance')}</span>
                  <span className="text-2xl font-bold">
                    {formatCurrency(
                      accountTotal?.totals?.overall?.actualBalance
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-white/20 text-center group hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  <BsArrowLeftRight className="text-xl" />
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  {accountTotal?.summary?.totalTransactions || 0}
                </div>
                <div className="text-gray-600 text-sm mt-1">
                  {t('Total Transactions')}
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-white/20 text-center group hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  <BsArrowDownCircle className="text-xl" />
                </div>
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(accountTotal?.totals?.overall?.totalIncoming)}
                </div>
                <div className="text-gray-600 text-sm mt-1">
                  {t('Total Incoming')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
