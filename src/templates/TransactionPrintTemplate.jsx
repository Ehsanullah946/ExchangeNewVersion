// templates/TransactionPrintTemplate.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatNumber } from '../utils/formatNumber';
import { useDateFormatter } from '../hooks/useDateFormatter';

const TransactionPrintTemplate = ({
  transactions = [],
  customerInfo = {},
  accountSummary = [],
}) => {
  const { t } = useTranslation();
  const { formatDisplay } = useDateFormatter();

  const getTransactionDescription = (transaction) => {
    if (transaction.description) {
      return transaction.description;
    }

    switch (transaction.type) {
      case 'deposit':
        return t('Deposit to account');
      case 'withdraw':
        return t('Withdrawal from account');
      case 'transfer':
        return `${transaction.senderName || t('Sender')} → ${
          transaction.receiverName || t('Receiver')
        }`;
      case 'receive':
        return `${transaction.senderName || t('Sender')} → ${
          transaction.receiverName || t('Receiver')
        }`;
      case 'exchange_sale':
        return t('Currency Sale');
      case 'exchange_purchase':
        return t('Currency Purchase');
      default:
        return t('Transaction');
    }
  };

  if (transactions.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">{t('Transaction History')}</h1>
        <p>{t('No transactions to display')}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="text-center mb-6 border-b pb-4">
        <h1 className="text-2xl font-bold">
          {t('Transaction History Report')}
        </h1>
        <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
          <div className="text-left">
            <p>
              <strong>{t('Customer')}:</strong> {customerInfo.name || 'N/A'}
            </p>
            <p>
              <strong>{t('Customer ID')}:</strong> {customerInfo.id || 'N/A'}
            </p>
          </div>
          <div className="text-right">
            <p>
              <strong>{t('Print Date')}:</strong>{' '}
              {new Date().toLocaleDateString()}
            </p>
            <p>
              <strong>{t('Total Transactions')}:</strong> {transactions.length}
            </p>
          </div>
        </div>
      </div>

      {/* Account Summary */}
      {accountSummary.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3">{t('Account Summary')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {accountSummary.map((account, index) => (
              <div key={index} className="border rounded p-3 bg-gray-50">
                <p className="font-semibold">
                  {t('Account')} {account.accountNo}
                </p>
                <p
                  className={`text-lg font-bold ${
                    account.balance < 0 ? 'text-red-600' : 'text-green-600'
                  }`}
                >
                  {formatNumber(account.balance)} {account.currency}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Transactions Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="border border-gray-300 p-2">
              {t('Transaction ID')}
            </th>
            <th className="border border-gray-300 p-2">{t('Date & Time')}</th>
            <th className="border border-gray-300 p-2">{t('Description')}</th>
            <th className="border border-gray-300 p-2">{t('Debit')}</th>
            <th className="border border-gray-300 p-2">{t('Credit')}</th>
            <th className="border border-gray-300 p-2">{t('Currency')}</th>
            <th className="border border-gray-300 p-2">{t('Balance')}</th>
            <th className="border border-gray-300 p-2">{t('Type')}</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border border-gray-300 p-2">
                {transaction.No ||
                  transaction.transferNo ||
                  transaction.receiveNo ||
                  'N/A'}
              </td>
              <td className="border border-gray-300 p-2">
                {formatDisplay(transaction.date, { showTime: true })}
              </td>
              <td className="border border-gray-300 p-2">
                {getTransactionDescription(transaction)}
              </td>
              <td className="border border-gray-300 p-2 text-right">
                {transaction.debit > 0 ? formatNumber(transaction.debit) : '-'}
              </td>
              <td className="border border-gray-300 p-2 text-right">
                {transaction.credit > 0
                  ? formatNumber(transaction.credit)
                  : '-'}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {transaction.moneyType || 'N/A'}
              </td>
              <td
                className={`border border-gray-300 p-2 text-right ${
                  transaction.runningBalance < 0
                    ? 'text-red-600'
                    : 'text-green-600'
                }`}
              >
                {formatNumber(transaction.runningBalance)}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {t(
                  transaction.type === 'exchange_sale'
                    ? 'Exchange Sale'
                    : transaction.type === 'exchange_purchase'
                    ? 'Exchange Purchase'
                    : transaction.type
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Footer */}
      <div className="mt-8 pt-4 border-t border-gray-300 text-sm text-gray-600">
        <p>
          {t('Generated by Banking System')} - {new Date().toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default TransactionPrintTemplate;
