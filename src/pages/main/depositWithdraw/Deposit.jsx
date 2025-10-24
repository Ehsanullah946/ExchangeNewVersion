import React, { useEffect, useState } from 'react';
import Select from '../../../components/common/LazySelect';
import {
  BsListCheck,
  BsPrinter,
  BsSearch,
  BsCurrencyDollar,
  BsWallet2,
} from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
import { FaRegArrowAltCircleDown } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../../../hooks/useToast';
import { useCreateDeposit } from '../../../hooks/useDeposit';
import { useAccount, useAccountSummary } from '../../../hooks/useAccount';
import { formatNumber } from '../../../utils/formatNumber';
import { useDateFormatter } from '../../../hooks/useDateFormatter';
import DateInput from '../../../components/common/DateInput';
import AfghanDatePicker from '../../../components/common/AfghanDatePicker';

const Deposit = () => {
  const { t } = useTranslation();
  const { currentCalendar, formatDisplay } = useDateFormatter();

  const toast = useToast();
  const { mutate, isLoading } = useCreateDeposit();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    deposit: '',
    withdraw: '',
    description: '',
    accountNo: '',
    employeeId: '',
    DWDate: new Date().toISOString().split('T')[0],
  });

  const { data: accountResponse } = useAccount();
  console.log('Account Response:', accountResponse);

  const [selectedAccountId, setSelectedAccountId] = useState(null);

  const { data: accountSummary, isLoading: summaryLoading } =
    useAccountSummary(selectedAccountId);

  console.log(accountSummary);

  const accountOptions = (accountResponse?.data || []).map((c) => ({
    value: c.No,
    label: `${c.Customer?.Stakeholder?.Person?.firstName} ${c.Customer?.Stakeholder?.Person?.lastName} - ${c.MoneyType.typeName}`,
  }));

  const handleAccountChange = (selected) => {
    const accountId = selected?.value;
    setSelectedAccountId(accountId);
    setForm((prev) => ({
      ...prev,
      accountNo: accountId || '',
    }));
  };

  const handleChange = (e) => {
    const { value, name, checked, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.deposit || !form.accountNo) {
      toast.error(t('Please Enter deposit and account'));
      return;
    }

    const payload = {
      ...form,
      deposit: parseFloat(form.deposit) || 0,
    };

    const cleanData = Object.fromEntries(
      Object.entries(payload).filter(
        ([_, v]) => v !== '' && v !== null && v !== undefined
      )
    );
    mutate(cleanData, {
      onSuccess: () => {
        toast.success(t('Deposit Created'));
        navigate('/main/depositList');
      },
      onError: (error) => {
        console.error('Backend error:', error);
        let errorMessage = t('createDepositFailed');

        if (error.response?.data?.message) {
          errorMessage = error.response.data.message;

          if (error.response.data.message.includes('Validation error')) {
            errorMessage = t('DepositDuplicate');
          } else if (error.response.data.message.includes('validation')) {
            errorMessage = t('invalidInputData');
          }
        }

        toast.error(errorMessage);
      },
    });
  };

  const getAccountStatus = (account) => {
    if (account.conversionDirection === 'no_rate') {
      return { color: 'bg-red-100 text-red-800', text: 'No Rate' };
    }

    if (account.isBaseCurrency) {
      return { color: 'bg-green-100 text-green-800', text: 'Base Currency' };
    }

    if (account.conversionDirection === 'direct') {
      return { color: 'bg-blue-100 text-blue-800', text: 'Direct Rate' };
    }

    if (account.conversionDirection === 'inverse') {
      return { color: 'bg-purple-100 text-purple-800', text: 'Inverse Rate' };
    }

    return { color: 'bg-gray-100 text-gray-800', text: 'Same Currency' };
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Actions */}
          <div className=" flex mt-1 justify-between  gap-1 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 mb-1">
            <div className="flex flex-wrap justify-center items-center p-2 gap-3">
              <Link to="/main/depositList">
                <button
                  className="flex  items-center gap-2 px-2 py-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-z-150 active:scale-110"
                  type="primary"
                >
                  <span className="flex justify-between">
                    <BsListCheck className="mt-1 ml-3" />
                    {t('List')}
                  </span>
                </button>
              </Link>
              <button
                className="flex items-center gap-2 px-2 py-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-110"
                type="primary"
              >
                <span className="flex justify-between ">
                  <BsPrinter className="mt-1 ml-3" /> {t('Print')}
                </span>
              </button>
              <button
                className="flex items-center gap-2 px-2 py-1 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-110 active:scale-110"
                type="primary"
              >
                <span className="flex justify-between ">
                  <BsSearch className="mt-1 ml-3" /> {t('Search')}
                </span>
              </button>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
              <div className="relative flex items-center bg-white rounded-xl shadow-lg border border-gray-100 pl-4 pr-2 py-2 min-w-64">
                <BsSearch className="text-gray-400 mr-2 flex-shrink-0" />
                <input
                  type="text"
                  placeholder={t('Search')}
                  className="w-full bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 font-medium tracking-wide"
                />
              </div>
            </div>
          </div>

          {/* Main Form */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-blue-600 rounded-t-2xl via-purple-600 to-indigo-700 p-3">
              <div className="flex items-center justify-center gap-3 text-white">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <FaRegArrowAltCircleDown className="text-xl" />
                </div>
                <h1 className="text-2xl font-bold tracking-tight">
                  {t('Deposit')}
                </h1>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-6 md:p-8">
              <form>
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Left Column - Input Fields */}
                  <div className="space-y-2">
                    {/* Account Selection */}
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700  ml-1">
                        {t('Account')}
                      </label>
                      <Select
                        className="w-full"
                        name="accountNo"
                        isSearchable
                        options={accountOptions}
                        value={accountOptions.find(
                          (opt) => opt.value === form.accountNo
                        )}
                        onChange={handleAccountChange}
                        styles={{
                          control: (base) => ({
                            ...base,
                            border: '1px solid #e2e8f0',
                            borderRadius: '12px',
                            padding: '3px 6px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                            transition: 'all 0.2s',
                            '&:hover': {
                              borderColor: '#6366f1',
                              boxShadow: '0 4px 12px rgba(99, 102, 241, 0.1)',
                            },
                          }),
                        }}
                      />
                    </div>

                    {/* Amount Input */}
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700  ml-1">
                        {t('Amount')}
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          name="deposit"
                          onChange={handleChange}
                          value={form.deposit}
                          className="w-full border border-gray-200 bg-gray-50/50 rounded-xl py-2 px-4 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                          required
                        />
                      </div>
                    </div>

                    {currentCalendar === 'persian' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('Date')} (هجری شمسی) - با تقویم
                        </label>
                        <AfghanDatePicker
                          name="DWDate"
                          value={form.DWDate}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    )}

                    {currentCalendar === 'gregorian' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('Date')}
                        </label>
                        <DateInput
                          name="DWDate"
                          value={form.DWDate}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    )}

                    {/* Description Textarea */}

                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('Description')}:
                      </label>
                      <textarea
                        rows="4"
                        value={form.description}
                        onChange={handleChange}
                        name="description"
                        className="w-full border border-gray-300 shadow-sm text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1"
                        placeholder="more...."
                      />
                    </div>
                    <div className="flex flex-wrap justify-center sm:justify-start gap-2 col-span-full">
                      <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        type="button"
                        className="flex items-center gap-2 px-4  bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-110 active:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {t('Save')}
                      </button>
                      <Link to="/main/depositList">
                        <button
                          type="button"
                          className="flex items-center gap-2 px-4 py-1  bg-gradient-to-r from-gray-500 to-slate-600 hover:from-gray-600 hover:to-slate-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-110"
                        >
                          {t('Cancel')}
                        </button>
                      </Link>
                    </div>
                  </div>

                  {/* Right Column - Account Summary */}
                  <div className="bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-2xl p-2 border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      {t('Account Summary')}
                      {summaryLoading && (
                        <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin ml-2"></div>
                      )}
                    </h3>

                    {!selectedAccountId ? (
                      <div className="text-center py-4">
                        <BsWallet2 className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-500">
                          {t('Select an account to view summary')}
                        </p>
                      </div>
                    ) : accountSummary?.success ? (
                      <>
                        {/* Customer Info */}
                        <div className="mb-3 p-3 bg-white rounded-xl shadow-sm border border-gray-100">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                              {accountSummary.customer.name?.charAt(0) || 'C'}
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">
                                {accountSummary.customer.name}
                              </h4>
                              <p className="text-sm text-gray-500">
                                {t('Customer ID')}: {accountSummary.customer.id}
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
                              {accountSummary.accounts.map((account, index) => {
                                const isCurrentAccount =
                                  account.accountId ===
                                  accountSummary.requestedAccount.id;
                                const status = getAccountStatus(account);

                                return (
                                  <tr
                                    key={account.accountId}
                                    className={`border-b border-gray-100 hover:bg-gray-50/80 transition-colors last:border-b-0 ${
                                      isCurrentAccount ? 'bg-blue-50' : ''
                                    }`}
                                  >
                                    <td className="px-3 py-2">
                                      <div className="flex items-center gap-2">
                                        <span className="font-medium text-gray-700">
                                          {account.currencyName}
                                        </span>
                                        {account.isBaseCurrency && (
                                          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                                            {t('Base')}
                                          </span>
                                        )}
                                      </div>
                                    </td>
                                    <td
                                      dir="ltr"
                                      className={`px-3 py-2 font-bold ${
                                        isCurrentAccount
                                          ? 'text-blue-700'
                                          : 'text-gray-700'
                                      }`}
                                    >
                                      {formatNumber(account.originalBalance)}{' '}
                                      {account.currencyName}
                                    </td>
                                    <td
                                      dir="ltr"
                                      className="px-3 py-2 font-medium text-gray-600"
                                    >
                                      {formatNumber(account.convertedBalance)}{' '}
                                      {accountSummary.summary.baseCurrency}
                                    </td>
                                    <td className="px-3 py-2">
                                      <span
                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}
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
                                  {formatNumber(
                                    accountSummary.summary.totalInBaseCurrency
                                  )}{' '}
                                  {accountSummary.summary.baseCurrency}
                                </p>
                                <p className="text-blue-100 flex-row text-xs mt-1">
                                  {t('Converted')}
                                  {': '}
                                  {formatDisplay(accountSummary.conversionDate)}
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
                                {accountSummary.summary.baseCurrency}
                              </div>
                            </div>

                            <div className="bg-white rounded-xl p-3 shadow-lg border border-purple-100">
                              <div className="text-sm text-gray-500 font-bold">
                                {t('Total Accounts')}
                              </div>
                              <div className="text-lg font-bold text-purple-600 mt-1">
                                {accountSummary.summary.totalAccounts}
                              </div>
                              {accountSummary.summary.missingRates > 0 && (
                                <div className="text-xs text-red-500 mt-1">
                                  {accountSummary.summary.missingRates}{' '}
                                  {t('missing rates')}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-8">
                        <BsWallet2 className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-500">
                          {t('No account data available')}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Deposit;
