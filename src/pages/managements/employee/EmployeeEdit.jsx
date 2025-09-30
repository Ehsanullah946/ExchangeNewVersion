import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useToast } from '../../../hooks/useToast';
import {
  useSingleEmployee,
  useUpdateEmployee,
} from '../../../hooks/useEmployee';
import { BsListCheck, BsPhone } from 'react-icons/bs';
import { PulseLoader } from 'react-spinners';
import { RiSendPlaneLine } from 'react-icons/ri';
import Button from '../../../components/layout/Button';

const EmployeeEdit = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const toast = useToast();

  const { data, isLoading: loadingEmployee } = useSingleEmployee(id);
  const { mutate: updateEmployee, isLoading: updating } = useUpdateEmployee();

  console.log(data);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    fatherName: '',
    nationalCode: '',
    phone: '',
    gender: '',
    currentAddress: '',
    permanentAddress: '',
    maritalStatus: '',
    job: '',
  });

  const handleChange = (e) => {
    const { value, type, checked, name } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  useEffect(() => {
    if (data?.data) {
      const employee = data.data;
      const stakeholder = employee.Stakeholder || {};
      const person = stakeholder.Person || {};
      setForm((prev) => ({
        ...prev,
        ...employee,
        firstName: person.firstName,
        lastName: person.lastName,
        fatherName: person.fatherName,
        phone: person.phone,
        email: person.email,
        nationalCode: person.nationalCode,
        currentAddress: person.currentAddress,
        permanentAddress: stakeholder.permanentAddress,
        job: stakeholder.job,
        gender: stakeholder.gender,
        maritalStatus: stakeholder.maritalStatus,
      }));
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanData = Object.fromEntries(
      Object.entries(form).filter(([_, v]) => v !== '' && v !== null)
    );

    updateEmployee(
      { id, payload: cleanData },
      {
        onSuccess: () => {
          toast.success(t('Update Successful'));
          navigate('/management/employee');
        },
        onError: (err) => {
          console.error(err);
          toast.error(t('Update failed'));
        },
      }
    );
  };

  if (loadingEmployee)
    return (
      <p className="p-4 flex justify-center">
        <PulseLoader color="green" size={15} />
      </p>
    );

  return (
    <>
      <div className="grid justify-center">
        <div className="flex mt-1 mb-1">
          <Link to="/management/employeeList">
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

        <div>
          {/* Add onSubmit to form element */}
          <form onSubmit={handleSubmit}>
            <div className="font-extrabold bg-gradient-to-b from-[#b34cfd] to-[#6048f9] p-3 ltr:mr-4 rtl:ml-4 rounded-t-2xl text-white text-center">
              <span className="flex justify-center gap-3">
                {t('Add New Employee')} <RiSendPlaneLine className="mt-1" />
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 p-3 rounded-b-2xl ltr:mr-4 rtl:ml-4 px-4 md:px-6 lg:px-10 border-b-2 border-t-2 shadow-2xl max-w-7xl mx-auto">
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
                  <label className="sm:w-32">{t('Gender')}:</label>
                  <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    className="w-full border border-gray-300 shadow-sm  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1"
                  >
                    <option value="">{t('Select')}</option>
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
              </div>

              {/* Middle Column */}
              <div className="w-full space-y-1 p-2">
                <div className="flex gap-2 flex-wrap md:flex-nowrap items-center justify-between">
                  <label className="sm:w-26">{t('PhoneNo')}:</label>
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
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 col-span-full">
                <button
                  onClick={handleSubmit}
                  disabled={updating}
                  type="button"
                  className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-4 py-1 text-center me-2 mb-2 "
                >
                  {t('Save')}
                </button>
                <Link to="/management/employeeList">
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
      </div>
    </>
  );
};

export default EmployeeEdit;
