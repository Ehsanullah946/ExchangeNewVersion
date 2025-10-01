import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useToast } from '../../../hooks/useToast';
import { useSingleBranch, useUpdateBranch } from '../../../hooks/useBranch';
import { RiMailFill } from 'react-icons/ri';
import {
  BsWhatsapp,
  BsTelegram,
  BsPhone,
  BsHouseAddFill,
} from 'react-icons/bs';
import { PulseLoader } from 'react-spinners';
const BranchEdit = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const toast = useToast();

  const { data, isLoading: loadingBranch } = useSingleBranch(id);
  const { mutate: updateBranch, isLoading: updating } = useUpdateBranch();

  console.log('this is branch', data);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    fatherName: '',
    nationalCode: '',
    currentAddress: '',
    phone: '',
    maritalStatus: '',
    gender: '',
    job: '',
    language: '',
    loanLimit: '',
    whatsApp: '',
    email: '',
    telegram: '',
    whatsAppEnabled: false,
    telegramEnabled: false,
    emailEnabled: false,
    phoneEnabled: false,
    faxNo: '',
    direct: true,
  });

  useEffect(() => {
    if (data?.data) {
      const branch = data.data; // this is the object you showed me
      const customer = branch.Customer || {};
      const stakeholder = customer.Stakeholder || {};
      const person = stakeholder.Person || {};

      console.log('🔥 Flattened Branch:', branch);

      setForm({
        // Branch level
        id: branch.id,
        direct: branch.direct ? 1 : 0,
        faxNo: branch.faxNo || '',

        // Customer level
        loanLimit: customer.loanLimit || '',
        language: customer.language || '',
        email: customer.email || '',
        whatsApp: customer.whatsApp || '',
        telegram: customer.telegram || '',
        phoneEnabled: !!customer.phoneEnabled,
        emailEnabled: !!customer.emailEnabled,
        whatsAppEnabled: !!customer.whatsAppEnabled,
        telegramEnabled: !!customer.telegramEnabled,

        // Stakeholder level
        job: stakeholder.job || '',
        maritalStatus: stakeholder.maritalStatus || '',

        // Person level
        firstName: person.firstName || '',
        lastName: person.lastName || '',
        fatherName: person.fatherName || '',
        gender: person.gender || '',
        phone: person.phone || '',
        permanentAddress: person.permanentAddress || '',
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanData = Object.fromEntries(
      Object.entries(form).filter(([_, v]) => v !== '' && v !== null)
    );

    updateBranch(
      { id, payload: cleanData },
      {
        onSuccess: () => {
          toast.success(t('Update Successful'));
          navigate('/management/branch');
        },
        onError: (err) => {
          console.error(err);
          toast.error(t('Update failed'));
        },
      }
    );
  };

  if (loadingBranch)
    return (
      <p className="p-4 flex justify-center">
        <PulseLoader color="green" size={15} />
      </p>
    );

  return (
    <>
      <div className="grid justify-center">
        <div className=" flex mt-1 mb-1"></div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="font-extrabold  bg-gradient-to-b from-[#b34cfd] to-[#6048f9]   p-3 ltr:mr-4 rtl:ml-4  rounded-t-2xl text-white  text-center">
              <span className="flex justify-center gap-3 ">
                {t('Update Branch')} <BsHouseAddFill className="mt-1" />
              </span>
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
                    <option value="">{t('Select Status')}</option>
                    <option value={t('single')}>{t('single')}</option>
                    <option value={t('married')}>{t('married')}</option>
                    <option value={t('divorced')}>{t('divorced')}</option>
                    <option value={t('widowed')}>{t('widowed')}</option>
                  </select>
                </div>

                <div className="flex gap-6 flex-wrap md:flex-nowrap justify-between">
                  <label className="sm:w-32">{t('Direction')}:</label>
                  <select
                    name="direct"
                    value={form.direct}
                    onChange={handleChange}
                    className="w-full border border-gray-300 shadow-sm  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1"
                  >
                    <option value="">{t('Select Direct')}</option>
                    <option value={1}>{t('Direct')}</option>
                    <option value={0}>{t('Undirect')}</option>
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
                  <label className="sm:w-32">{t('FaxNo')}:</label>
                  <input
                    type="text"
                    name="faxNo"
                    value={form.faxNo}
                    onChange={handleChange}
                    className="w-full border border-gray-300 shadow-sm text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1"
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
                  disabled={updating}
                  type="button"
                  className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-4 py-1 text-center me-2 mb-2 "
                >
                  {t('Save')}
                </button>
                <Link to="/management/branch">
                  <button
                    type="button"
                    className="text-white bg-gradient-to-r from-red-500 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-4 py-1 text-center me-2 mb-2"
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

export default BranchEdit;
