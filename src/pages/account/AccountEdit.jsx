import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useToast } from '../../hooks/useToast';
import { useSingleAccount, useUpdateAccount } from '../../hooks/useAccount';
import { PulseLoader } from 'react-spinners';
import { BsListCheck } from 'react-icons/bs';
import Button from '../../components/layout/Button';
import { useCustomers } from '../../hooks/useCustomers';
import { RiAccountBox2Fill } from 'react-icons/ri';
import { useMoneyType } from '../../hooks/useMoneyType';
import Select from 'react-select';

const AccountEdit = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const toast = useToast();

  const { data, isLoading: loadingAcount } = useSingleAccount(id);
  const { mutate: UpdateAccount, isLoading: updating } = useUpdateAccount();

  console.log('account fill data:', data);

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

  useEffect(() => {
    if (data?.data) {
      const account = data.data;
      setForm((prev) => ({
        ...prev,
        ...account,
      }));
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanData = Object.fromEntries(
      Object.entries(form).filter(
        ([_, v]) => v !== '' && v !== null && v !== undefined
      )
    );

    UpdateAccount(
      { id, payload: cleanData },
      {
        onSuccess: () => {
          toast.success(t('Update Successful'));
          navigate('/accounts/accountList');
        },
        onError: (err) => {
          console.error(err);
          toast.error(t('Update failed'));
        },
      }
    );
  };

  if (loadingAcount)
    return (
      <p className="p-4 flex justify-center">
        <PulseLoader color="green" size={15} />
      </p>
    );
  return (
    <div className="grid justify-center">
      <div className="flex mt-1 mb-1">
        <Link to="/accounts/accountList">
          <Button type="primary">
            <span className="flex justify-between">
              <BsListCheck className="mt-1 ml-3" />
              {t('List')}
            </span>
          </Button>
        </Link>
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
              dir="ltr"
              value={form.credit}
              className="border shadow-sm rounded-lg w-full p-1"
              onChange={handleChange}
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
              disabled={updating}
              type="button"
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-4 py-1 text-center me-2 mb-2 "
            >
              {t('Save')}
            </button>
            <Link to="/main/depositList">
              <button
                type="button"
                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-4 py-1 text-center me-2 mb-2"
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

export default AccountEdit;
