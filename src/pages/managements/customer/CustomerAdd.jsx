import React, { useState } from 'react';
import Button from '../../../components/layout/Button';
import {
  BsListCheck,
  BsPrinter,
  BsWhatsapp,
  BsSearch,
  BsTelegram,
  BsPhone,
} from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
import { RiMailFill, RiSendPlaneLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateCustomer } from '../../../hooks/useCustomers';
import { useToast } from '../../../hooks/useToast';

const CustomerAdd = () => {
  const { t } = useTranslation();
  const [isActive, setIsActive] = useState(true);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    fatherName: '',
    nationalCode: '',
    phone: '',
    currentAddress: '',
    permanentAddress: '',
    maritalStatus: '',
    job: '',
    language: '',
    loanLimit: '',
    gender: '',
    whatsAppEnabled: false,
    telegramEnabled: false,
    emailEnabled: false,
    phoneEnabled: false,
    whatsApp: '',
    telegram: '',
    email: '',
  });

  const { mutate, isLoading, error } = useCreateCustomer();
  const toast = useToast();
  const navigate = useNavigate();
  const [backendError, setBackendError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBackendError('');

    const validateForm = () => {
      const errors = {};

      if (!form.firstName.trim()) errors.firstName = t('firstNameRequired');
      if (!form.lastName.trim()) errors.lastName = t('lastNameRequired');
      if (form.phone && !/^[\d\s\-\+\(\)]{10,15}$/.test(form.phone)) {
        errors.phone = t('invalidPhoneFormat');
      }
      return errors;
    };

    const submitData = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      fatherName: form.fatherName.trim(),
      nationalCode: form.nationalCode.trim(),
      phone: form.phone.trim(),
      currentAddress: form.currentAddress.trim(),
      permanentAddress: form.permanentAddress.trim(),
      maritalStatus: form.maritalStatus,
      job: form.job.trim(),
      gender: form.gender.trim(),
      language: form.language,
      loanLimit: parseFloat(form.loanLimit) || 0,
      whatsAppEnabled: form.whatsAppEnabled,
      telegramEnabled: form.telegramEnabled,
      emailEnabled: form.emailEnabled,
      phoneEnabled: form.phoneEnabled,
      whatsApp: form.whatsApp.trim(),
      telegram: form.telegram.trim(),
      email: form.email.trim(),
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
        toast.success(t('customerCreated'));
        setTimeout(() => navigate('/management/customer'), 1000);
      },
      onError: (error) => {
        console.error('Backend error:', error);
        let errorMessage = t('createCustomerFailed');

        if (error.response?.data?.message) {
          errorMessage = error.response.data.message;

          if (error.response.data.message.includes('duplicate')) {
            errorMessage = t('customerDuplicate');
          } else if (error.response.data.message.includes('validation')) {
            errorMessage = t('invalidInputData');
          }
        }

        toast.error(errorMessage);
        setBackendError(errorMessage);
      },
    });
  };

  return (
    <>
      <div className="grid justify-center">
        <div className="flex mt-1 mb-1">
          <Link to="/management/customer">
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
          {/* Add onSubmit to form element */}
          <form onSubmit={handleSubmit}>
            <div className="font-extrabold bg-gradient-to-b from-[#b34cfd] to-[#6048f9] p-3 ltr:mr-4 rtl:ml-4 rounded-t-2xl text-white text-center">
              <span className="flex justify-center gap-3">
                {t('Add New Customer')} <RiSendPlaneLine className="mt-1" />
              </span>
              {error && (
                <p className="text-red-300 text-sm mt-2">
                  Error: {error.message || 'Failed to create customer'}
                </p>
              )}
            </div>

            <div className="grid sm:grid-cols-3 gap-8 p-3 rounded-b-2xl ltr:mr-4 rtl:ml-4 px-4 md:px-6 lg:px-10 border-b-2 border-t-2 shadow-2xl max-w-7xl mx-auto">
              {/* Left Column */}
              <div className="space-y-1 w-full">
                <div className="flex gap-6 flex-wrap md:flex-nowrap justify-between">
                  <label className="sm:w-32">{t('First Name')}:</label>
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    className="border border-gray-300 shadow-sm text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
                    required
                  />
                </div>

                <div className="flex gap-6 flex-wrap md:flex-nowrap justify-between">
                  <label className="sm:w-32">{t('Last Name')}:</label>
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 shadow-sm text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1"
                    required
                  />
                </div>

                <div className="flex gap-6 flex-wrap md:flex-nowrap justify-between">
                  <label className="sm:w-32">{t('Father Name')}:</label>
                  <input
                    type="text"
                    name="fatherName"
                    value={form.fatherName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 shadow-sm  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1"
                  />
                </div>

                <div className="flex gap-6 flex-wrap md:flex-nowrap justify-between">
                  <label className="sm:w-32">{t('Marital')}:</label>
                  <select
                    name="maritalStatus"
                    value={form.maritalStatus}
                    onChange={handleChange}
                    className="w-full border border-gray-300 shadow-sm  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1"
                  >
                    <option value="">Select Status</option>
                    <option value={t('single')}>{t('single')}</option>
                    <option value={t('married')}>{t('married')}</option>
                    <option value={t('divorced')}>{t('divorced')}</option>
                    <option value={t('widowed')}>{t('widowed')}</option>
                  </select>
                </div>

                <div className="flex gap-6 flex-wrap md:flex-nowrap justify-between">
                  <label className="sm:w-32">{t('Gender')}:</label>
                  <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    className="w-full border border-gray-300 shadow-sm  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1"
                  >
                    <option value="">Gender</option>
                    <option value={t('M')}>{t('male')}</option>
                    <option value={t('F')}>{t('famale')}</option>
                    <option value={t('O')}>{t('other')}</option>
                  </select>
                </div>

                <div className="flex gap-6 flex-wrap md:flex-nowrap justify-between">
                  <label className="sm:w-32">{t('Job')}:</label>
                  <input
                    type="text"
                    name="job"
                    value={form.job}
                    onChange={handleChange}
                    className="w-full border border-gray-300 shadow-sm  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1"
                  />
                </div>

                <div className="flex gap-6 flex-wrap md:flex-nowrap justify-between">
                  <label className="sm:w-32">{t('Loan Limit')}:</label>
                  <input
                    type="number"
                    name="loanLimit"
                    value={form.loanLimit}
                    onChange={handleChange}
                    className="w-full border border-gray-300 shadow-sm  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1"
                  />
                </div>
              </div>

              {/* Middle Column */}
              <div className="w-full space-y-1 p-2">
                <div className="flex gap-5 flex-wrap md:flex-nowrap justify-between">
                  <label className="sm:w-32">{t('N-Card')}:</label>
                  <input
                    type="text"
                    name="nationalCode"
                    value={form.nationalCode}
                    onChange={handleChange}
                    className="w-full border border-gray-300 shadow-sm text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1"
                    required
                  />
                </div>

                <div className="flex gap-5 flex-wrap md:flex-nowrap justify-between">
                  <label className="sm:w-32">{t('Languages')}:</label>
                  <input
                    type="text"
                    name="language"
                    value={form.language}
                    onChange={handleChange}
                    className="w-full border border-gray-300 shadow-sm text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1"
                  />
                </div>

                <div className="flex gap-5 flex-wrap md:flex-nowrap justify-between">
                  <label className="sm:w-32 mt-1">{t('perAddress')}:</label>
                  <textarea
                    rows="3"
                    name="permanentAddress"
                    value={form.permanentAddress}
                    onChange={handleChange}
                    className="w-full border border-gray-300 shadow-sm text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1"
                    placeholder="more...."
                  />
                </div>

                <div className="flex gap-5 flex-wrap md:flex-nowrap justify-between">
                  <label className="sm:w-32 mt-1">{t('curAddress')}:</label>
                  <textarea
                    rows="3"
                    name="currentAddress"
                    value={form.currentAddress}
                    onChange={handleChange}
                    className="w-full border border-gray-300 shadow-sm text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1"
                    placeholder="more...."
                  />
                </div>
              </div>

              {/* Right Column - Contact Info */}
              <div className="w-full space-y-1 p-2">
                <div className="flex gap-2 flex-wrap md:flex-nowrap items-center justify-between">
                  <label className="sm:w-10">{t('PhoneNo')}:</label>
                  <input
                    name="phoneEnabled"
                    checked={form.phoneEnabled}
                    onChange={handleChange}
                    type="checkbox"
                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500"
                  />
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3 pointer-events-none">
                      <BsPhone />
                    </div>
                    <input
                      type="text"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                      placeholder="123-456-7890"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap md:flex-nowrap justify-between items-center">
                  <label className="sm:w-10">{t('WhatsApp')}:</label>
                  <input
                    name="whatsAppEnabled"
                    checked={form.whatsAppEnabled}
                    onChange={handleChange}
                    type="checkbox"
                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500"
                  />
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3 pointer-events-none">
                      <BsWhatsapp />
                    </div>
                    <input
                      type="text"
                      name="whatsApp"
                      value={form.whatsApp}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                      placeholder="123-456-7890"
                    />
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap md:flex-nowrap justify-between items-center">
                  <label className="sm:w-10">{t('Email')}:</label>
                  <input
                    name="emailEnabled"
                    checked={form.emailEnabled}
                    onChange={handleChange}
                    type="checkbox"
                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500"
                  />
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3 pointer-events-none">
                      <RiMailFill />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                      placeholder="name@gmail.com"
                    />
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap md:flex-nowrap justify-between items-center">
                  <label className="sm:w-10">{t('Telegram')}:</label>
                  <input
                    name="telegramEnabled"
                    checked={form.telegramEnabled}
                    onChange={handleChange}
                    type="checkbox"
                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500"
                  />
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3 pointer-events-none">
                      <BsTelegram />
                    </div>
                    <input
                      type="text"
                      name="telegram"
                      value={form.telegram}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                      placeholder="123-456-7890"
                    />
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 col-span-full">
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  type="button"
                  class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-4 py-1 text-center me-2 mb-2 "
                >
                  {t('Save')}
                </button>
                <Link to="/management/customer">
                  <button
                    type="button"
                    class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-4 py-1 text-center me-2 mb-2"
                  >
                    {t('Cancel')}
                  </button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CustomerAdd;
