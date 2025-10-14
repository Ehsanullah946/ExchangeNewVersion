import React, { useState } from 'react';
import { useStateContext } from '../../context/contextProvider';
import Select from 'react-select';
import Button from '../../components/layout/Button';
import { BsListCheck, BsPrinter, BsSearch } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
import { MdToday } from 'react-icons/md';
import { BiChevronDown } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const DailyTransaction = () => {
  const { currentColor } = useStateContext();
  const [isActive, setIsActive] = useState(false);
  const { t } = useTranslation();
  return (
    <>
      <div className="grid justify-center">
        <div className=" flex mt-1 justify-between  gap-1 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 mb-1">
          <div className="flex flex-wrap justify-center items-center p-2 gap-3">
            <Link to="/daily/dailyTransactionList">
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
                  <MdToday className="text-xl" />
                </div>
                <h1 className="text-2xl font-bold tracking-tight">
                  {t('Daily Transaction')}
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
                  <label className="sm:w-32">{t('Customer')}:</label>
                  <Select
                    className="w-full shadow-sm "
                    name="branch"
                    isSearchable
                    isDisabled={!isActive}
                  />
                </div>

                <div className="flex gap-6 flex-wrap md:flex-nowrap justify-between">
                  <label htmlFor="" className="sm:w-32">
                    {t('Amount')}:
                  </label>
                  <div className="flex items-center w-full rounded-md bg-white px-1 py-0.5  outline-1 outline-gray-300 focus-within:outline-2 focus-within:outline-indigo-600">
                    <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm rtl:ml-3 ltr:mr-3">
                      $
                    </div>
                    <input
                      id="price"
                      name="price"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      className="block w-full grow border-0 bg-transparent text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm"
                    />

                    {/* Currency dropdown */}
                    <div className="relative shrink-0">
                      <select
                        id="currency"
                        name="currency"
                        aria-label="Currency"
                        className="appearance-none rounded-md bg-transparent py-1.5 pr-6 pl-2 text-base text-gray-700 focus:outline-none sm:text-sm"
                      >
                        <option>USD</option>
                        <option>CAD</option>
                        <option>EUR</option>
                      </select>

                      {/* Dropdown icon */}
                      <BiChevronDown
                        aria-hidden="true"
                        className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 size-5 text-gray-500 sm:size-4"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-6 flex-wrap md:flex-nowrap justify-between ">
                  <label className="sm:w-32">{t('Date')}:</label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 shadow-sm text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1"
                    required
                  />
                </div>

                <div className="flex gap-6 flex-wrap md:flex-nowrap justify-between ">
                  <label className="sm:w-32 mt-1">{t('Description')}:</label>
                  <textarea
                    rows="4"
                    className="w-full border border-gray-300 shadow-sm text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1"
                    placeholder="بشتر ..........."
                  />
                </div>

                <div className="flex flex-wrap justify-center sm:justify-start gap-2 col-span-full">
                  <button
                    //  onClick={handleSubmit}
                    //  disabled={isLoading}
                    type="button"
                    className="flex items-center gap-2 px-4  bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {t('Save')}
                  </button>
                  <Link to="/daily/dailyTransactionList">
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
                <ul class="grid  gap-6 md:grid-cols-2 mb-2">
                  <li>
                    <input
                      type="radio"
                      id="react-option"
                      value=""
                      class="hidden peer"
                      required=""
                      name="daily"
                    />
                    <label
                      for="react-option"
                      class="inline-flex items-center shadow-xl justify-between w-full p-5 text-gray-500 bg-white border-3 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-red-600 peer-checked:text-red-600 dark:peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300  hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                      <div class="block">
                        <div class="w-full text-lg font-semibold">
                          {t('Withdraw')}
                        </div>
                        <div class="w-full text-sm">JavaScript</div>
                      </div>
                    </label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      id="flowbite-option"
                      value=""
                      class="hidden peer"
                      name="daily"
                    />
                    <label
                      for="flowbite-option"
                      class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-3 border-gray-200 shadow-xl rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600  dark:peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-blue-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                      <div class="block">
                        <div class="w-full text-lg font-semibold">
                          {t('Deposit')}
                        </div>
                        <div class="w-full text-sm">Vue.js is</div>
                      </div>
                    </label>
                  </li>
                </ul>

                <div className="w-full p-1">
                  <p className="text-md mb-1 font-semibold">{t('Account')}</p>
                  <hr className="mb-2" />

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
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default DailyTransaction;
