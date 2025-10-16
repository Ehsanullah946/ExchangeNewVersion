import React, { useState } from 'react';
import Select from '../../components/common/LazySelect';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCreateAccount } from '../../hooks/useAccount';
import { useToast } from '../../hooks/useToast';
import Button from '../../components/layout/Button';
import { BsListCheck, BsPrinter, BsSearch } from 'react-icons/bs';
import { RiAccountBox2Fill } from 'react-icons/ri';
import { useCustomers } from '../../hooks/useCustomers';
import { useMoneyType } from '../../hooks/useMoneyType';

const Accounts = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const toast = useToast();
  const { mutate, isLoading } = useCreateAccount();

  const { data: moneyTypeResponse } = useMoneyType();

  const moneyTypeOptions = (moneyTypeResponse?.data || []).map((c) => ({
    value: c.id,
    label: `${c.typeName}`,
  }));

  const { data: customerResponse } = useCustomers();

  const customerOptions = (customerResponse?.data || []).map((c) => ({
    value: c.id,
    label: `${c.Stakeholder?.Person?.firstName} ${c.Stakeholder?.Person?.lastName}`,
  }));

  const [form, setForm] = useState({
    credit: '',
    whatsApp: false,
    email: false,
    smsEnabled: false,
    telegramEnabled: false,
    active: true,
    deleted: false,
    moneyTypeId: '',
    customerId: '',
    date: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // simple validation
    if (!form.customerId || !form.moneyTypeId) {
      toast.error(t('Please select customer and account type'));
      return;
    }

    const payload = {
      ...form,
      credit: parseFloat(form.credit) || 0,
    };

    mutate(payload, {
      onSuccess: () => {
        toast.success(t('Account Created'));
        navigate('/accounts/accountList');
      },
      onError: (error) => {
        console.error('Backend error:', error);
        let errorMessage = t('createAccountFailed');

        if (error.response?.data?.message) {
          errorMessage = error.response.data.message;

          if (error.response.data.message.includes('Validation error')) {
            errorMessage = t('AccountDuplicate');
          } else if (error.response.data.message.includes('validation')) {
            errorMessage = t('invalidInputData');
          }
        }

        toast.error(errorMessage);
      },
    });
  };

  return (
    <div className="grid justify-center">
      {/* HEADER BUTTONS */}
      <div className=" flex mt-1 justify-between  gap-1 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 mb-1">
        <div className="flex flex-wrap justify-center items-center p-2 gap-3">
          <Link to="/accounts/accountList">
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

      {/* FORM */}
      <form onSubmit={handleSubmit}>
        <div className="bg-gradient-to-r from-blue-600 rounded-t-2xl via-purple-600 to-indigo-700 p-3">
          <div className="flex items-center justify-center gap-3 text-white">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <RiAccountBox2Fill className="text-xl" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">
              {t('Add New Account')}
            </h1>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 p-3 rounded-b-2xl shadow-2xl max-w-4xl mx-auto">
          {/* Customer */}
          <div className="flex gap-6 justify-between">
            <label className="sm:w-32 mt-2">{t('Customer')}:</label>
            <Select
              className="w-full shadow-sm"
              name="customerId"
              isSearchable
              options={customerOptions}
              value={customerOptions.find(
                (opt) => opt.value === form.customerId
              )}
              onChange={(selected) =>
                setForm((prev) => ({
                  ...prev,
                  customerId: selected?.value || '',
                }))
              }
            />
          </div>

          {/* Money Type */}
          <div className="flex gap-6 justify-between">
            <label className="sm:w-32 mt-2">{t('Account Type')}:</label>

            <Select
              className="w-full shadow-sm"
              name="moneyTypeId"
              isSearchable
              options={moneyTypeOptions}
              value={moneyTypeOptions.find(
                (opt) => opt.value === form.moneyTypeId
              )}
              onChange={(selected) =>
                setForm((prev) => ({
                  ...prev,
                  moneyTypeId: selected?.value || '',
                }))
              }
            />
          </div>

          {/* Credit */}
          <div className="flex gap-6 justify-between">
            <label className="sm:w-32 mt-2">{t('Balance')}:</label>
            <input
              type="number"
              name="credit"
              value={form.credit}
              onChange={handleChange}
              className="border shadow-sm rounded-lg w-full p-1"
              required
            />
          </div>

          {/* Date */}
          <div className="flex gap-6 justify-between">
            <label className="sm:w-32 mt-2">{t('Date')}:</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="border shadow-sm rounded-lg w-full p-1"
              required
            />
          </div>

          {/* Submit */}
          <div className="flex flex-wrap justify-center sm:justify-start gap-2 col-span-full">
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              type="button"
              className="flex items-center gap-2 px-4  bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-110 active:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {t('Save')}
            </button>
            <Link to="/accounts/accountList">
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-1  bg-gradient-to-r from-gray-500 to-slate-600 hover:from-gray-600 hover:to-slate-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-110"
              >
                {t('Cancel')}
              </button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Accounts;
