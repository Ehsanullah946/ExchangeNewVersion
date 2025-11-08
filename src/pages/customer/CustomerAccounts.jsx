import { useTranslation } from 'react-i18next';
import { useCustomerAccounts } from '../../hooks/useCustomerAuth';
import { useDateFormatter } from '../../hooks/useDateFormatter';
import { formatNumber } from '../../utils/formatNumber';
import { BsCurrencyDollar } from 'react-icons/bs';

const CustomerAccounts = () => {
  const { t } = useTranslation();
  const { data: accountSummary, summaryLoading } = useCustomerAccounts();

  const { formatDisplay } = useDateFormatter();

  console.log('account data', accountSummary);

  const getAccountStatus = (account) => {
    if (account?.conversionDirection === 'no_rate') {
      return { color: 'bg-red-100 text-red-800', text: 'No Rate' };
    }

    if (account?.isMainCurrency) {
      return { color: 'bg-green-100 text-green-800', text: 'Base Currency' };
    }

    if (account?.conversionDirection === 'direct') {
      return { color: 'bg-blue-100 text-blue-800', text: 'Direct Rate' };
    }

    if (account?.conversionDirection === 'inverse') {
      return { color: 'bg-purple-100 text-purple-800', text: 'Inverse Rate' };
    }

    return { color: 'bg-gray-100 text-gray-800', text: 'Same Currency' };
  };

  if (summaryLoading) return <div>Loading accounts...</div>;

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-2xl px-8 py-5 border border-gray-200">
      <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
        {t('Account Summary')}
        {summaryLoading && (
          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin ml-2"></div>
        )}
      </h3>
      <>
        <div className="mb-3 p-3 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
              {accountSummary?.customer.name?.charAt(0) || 'C'}
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">
                {accountSummary?.customer.name}
              </h4>
              <p className="text-sm text-gray-500">
                {t('Customer ID')}: {accountSummary?.customer.id}
              </p>
            </div>
          </div>
        </div>

        {/* Accounts Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 mb-3">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-gray-800 to-slate-900">
                <th className="px-3 py-2 text-center text-white font-semibold text-sm">
                  {t('Currency')}
                </th>
                <th className="px-3 py-2 text-center text-white font-semibold text-sm">
                  {t('Balance')}
                </th>
                <th className="px-3 py-2 text-center text-white font-semibold text-sm">
                  {t('Converted')}
                </th>

                <th className="px-3 py-2 text-center text-white font-semibold text-sm">
                  {t('Status')}
                </th>
              </tr>
            </thead>
            <tbody>
              {accountSummary?.accounts.map((account, index) => {
                const isCurrentAccount =
                  account.accountId === accountSummary.requestedAccount;
                const status = getAccountStatus(account);
                return (
                  <tr
                    key={account.accountId}
                    className={`border-b border-gray-100 hover:bg-gray-50/80 transition-colors last:border-b-0 ${
                      isCurrentAccount ? 'bg-blue-50' : ''
                    }`}
                  >
                    <td className="px-3 text-center py-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-700">
                          {account.currencyName}
                        </span>
                        {account.isMainCurrency && (
                          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                            {t('Base')}
                          </span>
                        )}
                      </div>
                    </td>
                    <td
                      dir="ltr"
                      className={`px-3 py-2 text-center font-bold ${
                        isCurrentAccount ? 'text-blue-700' : 'text-gray-700'
                      }`}
                    >
                      {formatNumber(account.originalBalance)}{' '}
                      {account.currencyName}
                    </td>
                    <td
                      dir="ltr"
                      className="px-3 py-2 font-medium text-center text-gray-600"
                    >
                      {formatNumber(account.convertedBalance)}{' '}
                      {accountSummary?.summary.baseCurrency}
                    </td>
                    <td className="px-3 text-center py-2">
                      <span
                        className={`inline-flex items-center  px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}
                      >
                        {status.text}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Total Summary */}
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-3 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 font-bold text-sm">
                  {t('Total Balance')}
                </p>
                <p dir="ltr" className="text-xl font-bold mt-1">
                  {formatNumber(accountSummary?.summary.totalInMainCurrency)}{' '}
                  {accountSummary?.mainCurrency.name}
                </p>
                <p className="text-blue-100 flex-row text-xs mt-1">
                  {t('Converted')}
                  {': '}
                  {formatDisplay(accountSummary?.conversionDate)}
                </p>
              </div>
              <BsCurrencyDollar className="text-2xl text-blue-200" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-3 shadow-lg border border-green-100">
              <div className="text-sm text-gray-500 font-bold">
                {t('Base Currency')}
              </div>
              <div className="text-lg font-bold text-green-600 mt-1">
                {accountSummary?.mainCurrency.name}
              </div>
            </div>

            <div className="bg-white rounded-xl p-3 shadow-lg border border-purple-100">
              <div className="text-sm text-gray-500 font-bold">
                {t('Total Accounts')}
              </div>
              <div className="text-lg font-bold text-purple-600 mt-1">
                {accountSummary?.summary.totalAccounts}
              </div>
              {accountSummary?.summary.missingRates > 0 && (
                <div className="text-xs text-red-500 mt-1">
                  {accountSummary?.summary.missingRates} {t('missing rates')}
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default CustomerAccounts;
