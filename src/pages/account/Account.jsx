import React, { useState } from 'react';
import { useStateContext } from '../../context/contextProvider';
import Select from 'react-select';
import Button from '../../components/layout/Button';
import { BsListCheck, BsPrinter, BsSearch } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
import { RiAccountBox2Fill } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateAccount } from '../../hooks/useAccount';
import { useToast } from '../../hooks/useToast';
const Accounts = () => {
  const { isActive, setIsActive } = useStateContext();
  const { t } = useTranslation();

  const [form, setForm] = useState({
    credit: 0,
    whatsApp: false,
    email: false,
    smsEnabled: false,
    telegramEnabled: false,
    active: true,
    deleted: false,
    moneyTypeId: '',
    customerId: '',
  });

  const { mutate, isLoading, error } = useCreateAccount();

  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validateForm = () => {
      const errors = {};

      if (!form.credit.trim()) errors.lastName = t('creditRequired');
      if (!form.moneyTypeId.trim()) errors.firstName = t('moneyTypeRequired');
      if (!form.customerId.trim()) errors.lastName = t('customerRequired');
      return errors;
    };

    const submitData = {
      credit: parseFloat(form.credit) || 0,
      telegramEnabled: form.telegramEnabled,
      smsEnabled: form.smsEnabled,
      whatsApp: form.whatsApp,
      email: form.email,
      customerId: form.customerId,
      moneyTypeId: form.moneyTypeId,
      active: form.active,
      deleted: form.deleted,
    };

    // Remove empty strings
    const cleanData = Object.fromEntries(
      Object.entries(submitData).filter(
        ([_, v]) => v !== '' && v !== null && v !== undefined
      )
    );

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      toast.error(t('fix Errors') + '\n' + Object.values(errors).join('\n'));
      return;
    }

    console.log('Submitting data:', cleanData);

    mutate(cleanData, {
      onSuccess: () => {
        toast.success(t('Account Created'));
        setTimeout(() => navigate('/accounts/accountList'), 1000);
      },
      onError: (error) => {
        console.error('Backend error:', error);
        let errorMessage = t('createAccountFailed');

        if (error.response?.data?.message) {
          errorMessage = error.response.data.message;

          if (error.response.data.message.includes('Validation error')) {
            errorMessage = t('accountDuplicate');
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

        <div>
          <form>
            <div className="font-extrabold bg-blue-400 w-full  p-3 ltr:mr-4 rtl:ml-4  rounded-t-2xl text-white  text-center">
              <span className="flex justify-center gap-3 ">
                {t('Account')} <RiAccountBox2Fill className="mt-1" />
              </span>
            </div>
            <div className="grid sm:grid-cols-2 gap-6 p-3 rounded-b-2xl ltr:mr-4 rtl:ml-4 px-4 md:px-6 lg:px-10 border-b-2 border-t-2 shadow-2xl w-full max-w-7xl mx-auto">
              <div className=" space-y-1 w-full">
                <div className="flex gap-6 flex-wrap md:flex-nowrap justify-between ">
                  <label className="sm:w-32  mt-2">{t('Customer')}:</label>
                  <Select
                    className="w-full shadow-sm"
                    name="branch"
                    isSearchable
                    isDisabled={!isActive}
                  />
                </div>
                <div className="flex gap-6 flex-wrap md:flex-nowrap justify-between ">
                  <label className="sm:w-32 mt-2">{t('Account Type')}:</label>
                  <Select
                    className="w-full shadow-sm"
                    name="branch"
                    isSearchable
                    isDisabled={!isActive}
                  />
                </div>
                <div className="flex gap-6 flex-wrap md:flex-nowrap justify-between">
                  <label className="sm:w-32 mt-2">{t('Blance')}:</label>
                  <input
                    type="text"
                    className="border border-gray-300 shadow-sm text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
                    required
                  />
                </div>
                <div className="flex gap-6 flex-wrap md:flex-nowrap justify-between ">
                  <label className="sm:w-32 mt-2">{t('Date')}:</label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 shadow-sm text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1"
                    required
                  />
                </div>

                <div className="flex flex-wrap mt-3 justify-center sm:justify-start">
                  {isActive ? (
                    <>
                      <Button type="primary" htmlType="submit">
                        {t('Save')}
                      </Button>
                      <Button type="primary">{t('Cancel')}</Button>
                    </>
                  ) : (
                    <>
                      <Button type="primary" onClick={() => setIsActive(true)}>
                        {t('New')}
                      </Button>
                      <Button type="primary">{t('Edit')}</Button>
                      <Button type="primary">{t('Delete')}</Button>
                    </>
                  )}
                </div>
              </div>

              <div className="w-full p-3">
                <p className="text-md mb-1 font-semibold">{t('Account')}</p>
                <hr className="mb-3" />
                <div className="relative overflow-x-auto shadow-2xl sm:rounded-lg">
                  <table className="w-full text-sm text-left rtl:text-right text-blue-100">
                    <thead className="text-xs text-center text-white uppercase bg-blue-600">
                      <tr>
                        <th className="px-3 py-1">{t('Credit')}</th>
                        <th className="px-3 py-1">{t('Owe')}</th>
                        <th className="px-3 py-1">{t('Currency')}</th>
                        <th className="px-3 py-1">{t('Total')}</th>
                        <th className="px-3 py-1">{t('Status')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-blue-500 text-center border-b border-blue-400">
                        <td className="px-3 py-2">50000</td>
                        <td>30000</td>
                        <td>AFG</td>
                        <td>4300</td>
                        <td>بدهکار</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Accounts;
