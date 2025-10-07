import React, { useState } from 'react';
import Select from 'react-select';
import Button from '../../../components/layout/Button';
import { BsListCheck, BsPrinter, BsSearch } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
import { FaRegArrowAltCircleDown } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../../../hooks/useToast';
import { useCreateDeposit } from '../../../hooks/useDeposit';
import { useAccount } from '../../../hooks/useAccount';
const Deposit = () => {
  const { t } = useTranslation();

  const toast = useToast();
  const { mutate, isLoading } = useCreateDeposit();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    deposit: '',
    withdraw: '',
    description: '',
    accountNo: '',
    employeeId: '',
    DWData: new Date().toISOString().split('T')[0],
  });

  const { data: accountResponse } = useAccount();

  const accountOptions = (accountResponse?.data || []).map((c) => ({
    value: c.No,
    label: `${c.Customer?.Stakeholder?.Person?.firstName} - ${c.MoneyType.typeName}`,
  }));

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

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-6 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
            <div className="flex flex-wrap items-center gap-3">
              <Link to="/main/depositList">
                <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95">
                  <BsListCheck className="text-lg" />
                  <span className="font-semibold">{t('List')}</span>
                </button>
              </Link>

              <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95">
                <BsPrinter className="text-lg" />
                <span className="font-semibold">{t('Print')}</span>
              </button>

              <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95">
                <BsSearch className="text-lg" />
                <span className="font-semibold">{t('Search')}</span>
              </button>
            </div>

            {/* Search Bar */}
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

          {/* Main Form Section */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 p-6">
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
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Left Column - Input Fields */}
                  <div className="space-y-6">
                    {/* Account Selection */}
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
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
                        onChange={(selected) =>
                          setForm((prev) => ({
                            ...prev,
                            accountNo: selected?.value || '',
                          }))
                        }
                        styles={{
                          control: (base) => ({
                            ...base,
                            border: '1px solid #e2e8f0',
                            borderRadius: '12px',
                            padding: '4px 8px',
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
                      <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                        {t('Amount')}
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          name="deposit"
                          onChange={handleChange}
                          value={form.deposit}
                          className="w-full border border-gray-200 bg-gray-50/50 rounded-xl py-3 px-4 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                          required
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">
                          AFG
                        </div>
                      </div>
                    </div>

                    {/* Date Input */}
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                        {t('Date')}
                      </label>
                      <input
                        type="date"
                        name="DWData"
                        value={form.DWData}
                        onChange={handleChange}
                        className="w-full border border-gray-200 bg-gray-50/50 rounded-xl py-3 px-4 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                        required
                      />
                    </div>

                    {/* Description Textarea */}
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                        {t('Description')}
                      </label>
                      <textarea
                        rows="4"
                        name="description"
                        onChange={handleChange}
                        value={form.description}
                        className="w-full border border-gray-200 bg-gray-50/50 rounded-xl py-3 px-4 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm resize-none"
                        placeholder={t('Enter description here...')}
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4 pt-4">
                      <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        type="button"
                        className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {isLoading ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : null}
                        {t('Save')}
                      </button>

                      <Link to="/main/depositList">
                        <button
                          type="button"
                          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-gray-500 to-slate-600 hover:from-gray-600 hover:to-slate-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                        >
                          {t('Cancel')}
                        </button>
                      </Link>
                    </div>
                  </div>

                  {/* Right Column - Account Summary */}
                  <div className="bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-2xl p-6 border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      {t('Account Summary')}
                    </h3>

                    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gradient-to-r from-gray-800 to-slate-900">
                            <th className="px-4 py-3 text-left text-white font-semibold text-sm">
                              {t('Credit')}
                            </th>
                            <th className="px-4 py-3 text-left text-white font-semibold text-sm">
                              {t('Owe')}
                            </th>
                            <th className="px-4 py-3 text-left text-white font-semibold text-sm">
                              {t('Currency')}
                            </th>
                            <th className="px-4 py-3 text-left text-white font-semibold text-sm">
                              {t('Total')}
                            </th>
                            <th className="px-4 py-3 text-left text-white font-semibold text-sm">
                              {t('Status')}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors">
                            <td className="px-4 py-3 font-medium text-gray-700">
                              50,000
                            </td>
                            <td className="px-4 py-3 font-medium text-gray-700">
                              30,000
                            </td>
                            <td className="px-4 py-3">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                AFG
                              </span>
                            </td>
                            <td className="px-4 py-3 font-bold text-green-600">
                              4,300
                            </td>
                            <td className="px-4 py-3">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                {t('Debtor')}
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Additional Summary Cards */}
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="bg-white rounded-xl p-4 shadow-lg border border-green-100">
                        <div className="text-sm text-gray-500 font-medium">
                          {t('Available Balance')}
                        </div>
                        <div className="text-xl font-bold text-green-600 mt-1">
                          20,000 AFG
                        </div>
                      </div>
                      <div className="bg-white rounded-xl p-4 shadow-lg border border-blue-100">
                        <div className="text-sm text-gray-500 font-medium">
                          {t('Total Deposits')}
                        </div>
                        <div className="text-xl font-bold text-blue-600 mt-1">
                          15,300 AFG
                        </div>
                      </div>
                    </div>
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
