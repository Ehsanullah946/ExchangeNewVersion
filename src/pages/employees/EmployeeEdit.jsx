import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useToast } from '../../hooks/useToast';
import { useSingleEmployee, useUpdateEmployee } from '../../hooks/useEmployee';
import { BsListCheck, BsPhone } from 'react-icons/bs';
import { PulseLoader } from 'react-spinners';
import { RiSendPlaneLine } from 'react-icons/ri';
import Button from '../../components/layout/Button';

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
          navigate('/management/employeeList');
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
        <div className=" flex mt-1 justify-between  gap-1 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 mb-1">
          <div className="flex flex-wrap justify-center items-center p-2 gap-3">
            <Link to="/management/employee">
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
          {/* Add onSubmit to form element */}
          <form onSubmit={handleSubmit}>
            <div className="bg-gradient-to-r from-blue-600 rounded-t-2xl via-purple-600 to-indigo-700 p-3">
              <div className="flex items-center justify-center gap-3 text-white">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <BsPersonAdd className="text-xl" />
                </div>
                <h1 className="text-2xl font-bold tracking-tight">
                  {t('Update Employee')}
                </h1>
              </div>
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
                  className="flex items-center gap-2 px-4  bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-110 active:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {t('Save')}
                </button>
                <Link to="/management/employeeList">
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
      </div>
    </>
  );
};

export default EmployeeEdit;
