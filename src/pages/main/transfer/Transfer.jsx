import React, { useState } from 'react';
import { useStateContext } from '../../../context/contextProvider';
import Select from 'react-select';
import { BiChevronDown } from 'react-icons/bi';
import Button from '../../../components/layout/Button';
import { BsListCheck, BsPrinter, BsSearch } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
import { RiSendPlaneLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
const Transfer = () => {
  const { currentColor } = useStateContext();
  const [isActive, setIsActive] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <div className="grid justify-center">
        <div className=" flex mt-1 mb-1">
          <Link to="/main/transferList">
            <Button type="secondry">
              <span className="flex justify-between">
                <BsListCheck className="mt-1 ml-3" />
                {t('List')}
              </span>
            </Button>
          </Link>
          <Button type="secondry">
            <span className="flex justify-between ">
              <BsPrinter className="mt-1 ml-3" /> {t('Print')}
            </span>
          </Button>
          <Button type="secondry">
            <span className="flex justify-between ">
              <BsSearch className="mt-1 ml-3" /> {t('Search')}
            </span>
          </Button>
          <div class="h-8 flex items-center justify-center bg-gradient-to-b from-[#e3d5ff] to-[#ffe7e7] rounded-2xl overflow-hidden cursor-pointer shadow-md">
            <input
              type="text"
              name="text"
              id="input"
              placeholder={t('Search by number')}
              class="h-6 border-none outline-none caret-orange-600 bg-white rounded-[30px] px-3 tracking-[0.8px] text-[#131313] font-serif"
            />
          </div>
        </div>
        <div>
          <form>
            <div className="font-extrabold bg-blue-400 w-full  p-3 ltr:mr-4 rtl:ml-4  rounded-t-2xl text-white  text-center">
              <span className="flex justify-center gap-3 ">
                {t('Send')} <RiSendPlaneLine className="mt-1" />
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-8 p-3 rounded-b-2xl ltr:mr-4 rtl:ml-4 px-4 md:px-6 lg:px-10 border-b-2 border-t-2 shadow-2xl w-full max-w-7xl mx-auto">
              <div className=" space-y-1 w-full">
                <div className="flex gap-6 flex-wrap md:flex-nowrap justify-between ">
                  <label className="sm:w-32">{t('Account')}:</label>
                  <Select
                    className="w-full shadow-sm"
                    name="branch"
                    isSearchable
                    isDisabled={!isActive}
                  />
                </div>

                <div className="flex gap-6 flex-wrap md:flex-nowrap justify-between ">
                  <label className="sm:w-32">{t('Number')}:</label>
                  <input
                    type="text"
                    className="border border-gray-300 shadow-sm text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
                    required
                  />
                </div>
                <div className="flex gap-6 flex-wrap md:flex-nowrap justify-between ">
                  <label className="sm:w-32">{t('Transfer')}:</label>
                  <input
                    type="text"
                    className=" w-full border border-gray-300 shadow-sm text-red-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1"
                    required
                  />
                </div>
                <div className="flex gap-6 flex-wrap md:flex-nowrap justify-between ">
                  <label className="sm:w-32">{t('Receiver')}:</label>
                  <input
                    type="text"
                    className=" w-full border border-gray-300 shadow-sm text-red-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1"
                    required
                  />
                </div>

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

                <div className="flex gap-6 flex-wrap md:flex-nowrap justify-between">
                  <label htmlFor="" className="sm:w-32">
                    {t('charges')}:
                  </label>
                  <div className="flex items-center w-full rounded-md bg-white px-1 py-0.5 outline outline-1 outline-gray-300 focus-within:outline-2 focus-within:outline-indigo-600">
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
                      <BiChevronDown
                        aria-hidden="true"
                        className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 size-5 text-gray-500 sm:size-4"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-6 flex-wrap md:flex-nowrap justify-between">
                  <label htmlFor="" className="sm:w-32">
                    {t('place charge')}:
                  </label>
                  <div className="flex items-center w-full rounded-md bg-white px-1 py-0.5 outline outline-1 outline-gray-300 focus-within:outline-2 focus-within:outline-indigo-600">
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
              </div>

              <div className="w-full  space-y-1 p-2">
                <div className="flex gap-5 flex-wrap md:flex-nowrap justify-between ">
                  <label className="sm:w-32">{t('Date')}:</label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 shadow-sm text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1"
                    required
                  />
                </div>

                <div className="flex gap-5 flex-wrap md:flex-nowrap justify-between ">
                  <label className="sm:w-32">{t('Account')}:</label>
                  <Select
                    className="w-full shadow-sm"
                    name="branch"
                    isSearchable
                    isDisabled={!isActive}
                  />
                </div>
                <div className="flex gap-5 flex-wrap md:flex-nowrap justify-between ">
                  <label className="sm:w-32">{t('Account')}:</label>
                  <Select
                    className="w-full shadow-sm"
                    name="branch"
                    isSearchable
                    isDisabled={!isActive}
                  />
                </div>
                <div className="flex gap-5 flex-wrap md:flex-nowrap justify-between ">
                  <label className="sm:w-32 mt-1">{t('Description')}:</label>
                  <textarea
                    rows="4"
                    className="w-full border border-gray-300 shadow-sm text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1"
                    placeholder="more...."
                  />
                </div>
              </div>
              <div className="flex flex-wrap  justify-center sm:justify-start">
                {isActive ? (
                  <>
                    <Button type="primary" htmlType="submit">
                      {t('Save')}
                    </Button>
                    <Button type="primary">{t('Cancel')}</Button>
                  </>
                ) : (
                  <>
                    <Button
                      bgColor="rgba(244, 45, 0, 0.2)"
                      type="primary"
                      onClick={() => setIsActive(true)}
                    >
                      {t('New')}
                    </Button>
                    <Button type="primary">{t('Edit')}</Button>
                    <Button type="primary">{t('Delete')}</Button>
                  </>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Transfer;
