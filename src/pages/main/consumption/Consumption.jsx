import React, { useState } from 'react';
import { useStateContext } from '../../../context/contextProvider';
import Select from 'react-select';
import { BiChevronDown } from 'react-icons/bi';
import Button from '../../../components/layout/Button';
import { BsListCheck, BsPrinter, BsSearch } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
import { GiPayMoney } from 'react-icons/gi';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../../../hooks/useToast';
import { useCreateConsumption } from '../../../hooks/useConsumption';
import { useEmployee } from '../../../hooks/useEmployee';
import { useMoneyType } from '../../../hooks/useMoneyType';

const Consumption = () => {
  const { t } = useTranslation();

  const toast = useToast();
  const { mutate, isLoading } = useCreateConsumption();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    amount: '',
    moneyTypeId: '',
    description: '',
    employeeId: '',
    expenceType: '',
    eDate: new Date().toISOString().split('T')[0],
  });

  const { data: employeeResponse } = useEmployee();

  const employeeOptions = (employeeResponse?.data || []).map((c) => ({
    value: c.No,
    label: `${c.Stakeholder?.Person?.firstName}`,
  }));

  const handleChange = (e) => {
    const { value, name, checked, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const { data: moneyTypeResponse } = useMoneyType();
  const moneyTypeOptions = (moneyTypeResponse?.data || []).map((c) => ({
    value: String(c.id),
    label: c.typeName,
  }));

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.amount || !form.moneyTypeId) {
      toast.error(t('Please Enter amount and moneyType'));
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
        toast.success(t('consumption Created'));
        navigate('/main/consumptionList');
      },
      onError: (error) => {
        console.error('Backend error:', error);
        let errorMessage = t('createConsumptionFailed');

        if (error.response?.data?.message) {
          errorMessage = error.response.data.message;

          if (error.response.data.message.includes('Validation error')) {
            errorMessage = t('consumptionDuplicate');
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
            <Link to="/main/consumptionList">
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
                  <GiPayMoney className="text-xl" />
                </div>
                <h1 className="text-2xl font-bold tracking-tight">
                  {t('Consumption')}
                </h1>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 p-3 rounded-b-2xl ltr:mr-4 rtl:ml-4 px-4 md:px-6 lg:px-10 border-b-2 border-t-2 shadow-2xl w-full max-w-7xl mx-auto">
              <div className=" space-y-2 w-full">
                <div className="flex gap-6 flex-wrap md:flex-nowrap justify-between ">
                  <label className="sm:w-32">{t('Date')}:</label>
                  <input
                    type="date"
                    name="eDate"
                    value={form.eDate}
                    onChange={handleChange}
                    className="w-full border border-gray-300 shadow-sm text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1"
                    required
                  />
                </div>
                {/* <div className="flex gap-6 flex-wrap md:flex-nowrap justify-between">
                  <label className="sm:w-32">{t('Number')}:</label>
                  <input
                    type="text"
                    className="border border-gray-300 shadow-sm text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
                    required
                  />
                </div> */}
                <div className="flex gap-6 flex-wrap md:flex-nowrap justify-between">
                  <label htmlFor="" className="sm:w-32">
                    {t('Amount')}:
                  </label>
                  <div className="flex items-center w-full rounded-md bg-white px-1 py-0.5 outline outline-1 outline-gray-300 focus-within:outline-2 focus-within:outline-indigo-600">
                    <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm rtl:ml-3 ltr:mr-3">
                      $
                    </div>
                    <input
                      id="price"
                      name="amount"
                      value={form.amount}
                      onChange={handleChange}
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      className="block w-full grow border-0 bg-transparent text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm"
                    />

                    {/* Currency dropdown */}
                    <div className="relative shrink-0">
                      <select
                        id="currency"
                        name="moneyTypeId"
                        value={form.moneyTypeId}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            moneyTypeId: e.target.value,
                          }))
                        }
                        aria-label="Currency"
                        className="appearance-none rounded-md bg-transparent py-1.5 pr-6 pl-2 text-base text-gray-700 focus:outline-none sm:text-sm"
                      >
                        <option value="">Cur</option>
                        {moneyTypeOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>

                      {/* Dropdown icon */}
                      <BiChevronDown
                        aria-hidden="true"
                        className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 size-5 text-gray-500 sm:size-4"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-6 flex-wrap md:flex-nowrap justify-between">
                  <label className="sm:w-32">{t('Expence Type')}:</label>
                  <input
                    type="number"
                    onChange={handleChange}
                    value={form.expenceType}
                    name="expenceType"
                    className="border border-gray-300 shadow-sm text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
                    required
                  />
                </div>

                <div className="flex gap-6 flex-wrap md:flex-nowrap justify-between ">
                  <label className="sm:w-32 mt-1">{t('Description')}:</label>
                  <textarea
                    rows="3"
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
                  <Link to="/main/consumptionList">
                    <button
                      type="button"
                      className="flex items-center gap-2 px-4 py-1  bg-gradient-to-r from-gray-500 to-slate-600 hover:from-gray-600 hover:to-slate-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-110"
                    >
                      {t('Cancel')}
                    </button>
                  </Link>
                </div>
              </div>

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
    </>
  );
};

export default Consumption;
