import React, { useState } from 'react';
import Select from 'react-select';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCreateAccount } from '../../hooks/useAccount';
import { useToast } from '../../hooks/useToast';
import { useStateContext } from '../../context/contextProvider';
import Button from '../../components/layout/Button';
import { BsListCheck, BsPrinter, BsSearch } from 'react-icons/bs';
import { RiAccountBox2Fill } from 'react-icons/ri';
import { useCustomers } from '../../hooks/useCustomers';
import { useMoneyType } from '../../hooks/useMoneyType';

const Accounts = () => {
  const { t } = useTranslation();
  const { isActive } = useStateContext();
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
    date: '', // <-- add date field
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
      <div className="flex mt-1 mb-1">
        <Link to="/accounts/accountList">
          <Button type="primary">
            <span className="flex justify-between">
              <BsListCheck className="mt-1 ml-3" />
              {t('List')}
            </span>
          </Button>
        </Link>
        <Button type="primary">
          <span className="flex justify-between">
            <BsPrinter className="mt-1 ml-3" /> {t('Print')}
          </span>
        </Button>
        <Button type="primary">
          <span className="flex justify-between">
            <BsSearch className="mt-1 ml-3" /> {t('Search')}
          </span>
        </Button>
        <div className="h-8 flex items-center justify-center bg-gradient-to-b from-[#e3d5ff] to-[#ffe7e7] rounded-2xl overflow-hidden cursor-pointer shadow-md">
          <input
            type="text"
            name="text"
            className="h-6 border-none outline-none caret-orange-600 bg-white rounded-[30px] px-3 tracking-[0.8px] text-[#131313] font-serif"
            placeholder={t('Search')}
          />
        </div>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit}>
        <div className="font-extrabold bg-blue-400 p-3 rounded-t-2xl text-white text-center">
          <span className="flex justify-center gap-3">
            {t('Account')} <RiAccountBox2Fill className="mt-1" />
          </span>
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
          <div className="flex justify-center sm:justify-start gap-2 col-span-full">
            <button
              type="submit"
              disabled={isLoading}
              className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded-lg"
            >
              {t('Save')}
            </button>
            <Link to="/accounts/accountList">
              <button
                type="button"
                className="text-white bg-red-500 hover:bg-red-600 px-4 py-1 rounded-lg"
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
