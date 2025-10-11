import React, { useState } from 'react';
import Select from 'react-select';
import Button from '../../../components/layout/Button';
import { BsListCheck, BsPrinter, BsSearch } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
import { MdCompareArrows } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../../../hooks/useToast';
import { useCreateTransferToAccount } from '../../../hooks/useTransferToAccount';
import { useAccount } from '../../../hooks/useAccount';
const TransferToAccount = () => {
  const [isActive, setIsActive] = useState(false);
  const { t } = useTranslation();

  const toast = useToast();
  const { mutate, isLoading } = useCreateTransferToAccount();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fromAccount: '',
    toAccount: '',
    amount: '',
    description: '',
    employeeId: '',
    tData: new Date().toISOString().split('T')[0],
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

    if (!form.fromAccount || !form.toAccount || !form.amount) {
      toast.error(t('Please Enter the base account  and  distanation account'));
      return;
    }

    const payload = {
      ...form,
      amount: parseFloat(form.amount) || 0,
    };

    const cleanData = Object.fromEntries(
      Object.entries(payload).filter(
        ([_, v]) => v !== '' && v !== null && v !== undefined
      )
    );
    mutate(cleanData, {
      onSuccess: () => {
        toast.success(t('transfer Created'));
        navigate('/main/transferToAccountList');
      },
      onError: (error) => {
        console.error('Backend error:', error);
        let errorMessage = t('createTransferFailed');

        if (error.response?.data?.message) {
          errorMessage = error.response.data.message;

          if (error.response.data.message.includes('Validation error')) {
            errorMessage = t('TransferDuplicate');
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
      <div className="grid justify-center">
        <div className=" flex mt-1 justify-between  gap-1 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 mb-1">
          <div className="flex flex-wrap justify-center items-center p-2 gap-3">
            <Link to="/main/transferToAccountList">
              <button className="flex  items-center gap-2 px-2 py-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-z-150 active:scale-110">
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
              className="flex items-center gap-2 px-2 py-1 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-110"
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
        <div>
          <form>
            <div className="bg-gradient-to-r from-blue-600 rounded-t-2xl via-purple-600 to-indigo-700 p-3">
              <div className="flex items-center justify-center gap-3 text-white">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <MdCompareArrows className="text-xl" />
                </div>
                <h1 className="text-2xl font-bold tracking-tight">
                  {t('Transfer To Account')}
                </h1>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 p-3 rounded-b-2xl ltr:mr-4 rtl:ml-4 px-4 md:px-6 lg:px-10 border-b-2 border-t-2 shadow-2xl w-full max-w-7xl mx-auto">
              <div className=" space-y-1 w-full">
                <div className="flex gap-6 flex-wrap md:flex-nowrap justify-between ">
                  <label className="sm:w-32">{t('Number')}:</label>
                  <input
                    type="text"
                    className="border border-gray-300 shadow-sm text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
                    required
                  />
                </div>

                <div className="flex gap-6 flex-wrap md:flex-nowrap justify-between ">
                  <label className="sm:w-32">{t('From Account')}:</label>
                  <Select
                    className="w-full shadow-sm"
                    name="fromAccount"
                    isSearchable
                    options={accountOptions}
                    value={accountOptions.find(
                      (opt) => opt.value === form.fromAccount
                    )}
                    onChange={(selected) =>
                      setForm((prev) => ({
                        ...prev,
                        fromAccount: selected?.value || '',
                      }))
                    }
                  />
                </div>
                <div className="flex gap-6 flex-wrap md:flex-nowrap justify-between ">
                  <label className="sm:w-32">{t('To Account')}:</label>
                  <Select
                    className="w-full shadow-sm"
                    name="toAccount"
                    isSearchable
                    options={accountOptions}
                    value={accountOptions.find(
                      (opt) => opt.value === form.toAccount
                    )}
                    onChange={(selected) =>
                      setForm((prev) => ({
                        ...prev,
                        toAccount: selected?.value || '',
                      }))
                    }
                  />
                </div>
                <div className="flex gap-6 flex-wrap md:flex-nowrap justify-between ">
                  <label className="sm:w-32">{t('Amount')}:</label>
                  <input
                    type="number"
                    name="amount"
                    onChange={handleChange}
                    value={form.amount}
                    className=" w-full border border-gray-300 shadow-sm font-semibold  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1"
                    required
                  />
                </div>
                <div className="flex gap-6 justify-between">
                  <label className="sm:w-32 mt-2">{t('Date')}:</label>
                  <input
                    type="date"
                    name="tDate"
                    value={form.tData}
                    onChange={handleChange}
                    className="border shadow-sm rounded-lg w-full p-1"
                    required
                  />
                </div>

                <div className="flex gap-6 flex-wrap md:flex-nowrap justify-between ">
                  <label className="sm:w-32 mt-1">{t('Description')}:</label>
                  <textarea
                    rows="4"
                    name="description"
                    onChange={handleChange}
                    value={form.description}
                    className="w-full border border-gray-300 shadow-sm text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1"
                    placeholder="بشتر ..........."
                  />
                </div>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2 col-span-full">
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    type="button"
                    className="flex items-center gap-2 px-4  bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {t('Save')}
                  </button>
                  <Link to="/main/transferToAccount">
                    <button
                      type="button"
                      className="flex items-center gap-2 px-4 py-1  bg-gradient-to-r from-gray-500 to-slate-600 hover:from-gray-600 hover:to-slate-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-110"
                    >
                      {t('Cancel')}
                    </button>
                  </Link>
                </div>
              </div>
              <div>
                <div className="bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-2xl p-3 border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
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
                  <div className="bg-white mt-3 rounded-xl shadow-lg overflow-hidden border border-gray-100">
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
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default TransferToAccount;
