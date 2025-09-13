import React, { useState } from 'react';
import { useStateContext } from '../../../context/contextProvider';
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
import { Link } from 'react-router-dom';
const CustomerAdd = () => {
  const { currentColor } = useStateContext();
  const [isActive, setIsActive] = useState(false);
  const { t } = useTranslation();
  return (
    <>
      <div className="grid justify-center">
        <div className=" flex mt-1 mb-1">
          <Link to="/management/customer">
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
        </div>
        <div>
          <form>
            <div className="font-extrabold bg-blue-400 w-full  p-3 ltr:mr-4 rtl:ml-4  rounded-t-2xl text-white  text-center">
              <span className="flex justify-center gap-3 ">
                {t('Add New Customer')} <RiSendPlaneLine className="mt-1" />
              </span>
            </div>

            <div className="grid sm:grid-cols-3 gap-8 p-3 rounded-b-2xl ltr:mr-4 rtl:ml-4 px-4 md:px-6 lg:px-10 border-b-2 border-t-2 shadow-2xl w-full max-w-7xl mx-auto">
              <div className=" space-y-1 w-full">
                <div className="flex gap-6 flex-wrap md:flex-nowrap justify-between ">
                  <label className="sm:w-32">{t('ID')}:</label>
                  <input
                    type="text"
                    className="border border-gray-300 shadow-sm text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
                    required
                  />
                </div>

                <div className="flex gap-6 flex-wrap md:flex-nowrap justify-between ">
                  <label className="sm:w-32">{t('First Name')}:</label>
                  <input
                    type="text"
                    className="border border-gray-300 shadow-sm text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
                    required
                  />
                </div>
                <div className="flex gap-6 flex-wrap md:flex-nowrap justify-between ">
                  <label className="sm:w-32">{t('Last Name')}:</label>
                  <input
                    type="text"
                    className=" w-full border border-gray-300 shadow-sm text-red-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1"
                    required
                  />
                </div>
                <div className="flex gap-6 flex-wrap md:flex-nowrap justify-between ">
                  <label className="sm:w-32">{t('Father Name')}:</label>
                  <input
                    type="text"
                    className=" w-full border border-gray-300 shadow-sm text-red-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1"
                    required
                  />
                </div>
                <div className="flex gap-6 flex-wrap md:flex-nowrap justify-between ">
                  <label className="sm:w-32">{t('Marital')}:</label>
                  <input
                    type="text"
                    className=" w-full border border-gray-300 shadow-sm text-red-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1"
                    required
                  />
                </div>
                <div className="flex gap-6 flex-wrap md:flex-nowrap justify-between ">
                  <label className="sm:w-32">{t('Job')}:</label>
                  <input
                    type="text"
                    className=" w-full border border-gray-300 shadow-sm text-red-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1"
                    required
                  />
                </div>
                <div className="flex gap-6 flex-wrap md:flex-nowrap justify-between ">
                  <label className="sm:w-32">{t('Loan Limit')}:</label>
                  <input
                    type="text"
                    className=" w-full border border-gray-300 shadow-sm text-red-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1"
                    required
                  />
                </div>
              </div>

              <div className="w-full  space-y-1 p-2">
                <div className="flex gap-5 flex-wrap md:flex-nowrap justify-between ">
                  <label className="sm:w-32">{t('N-Card')}:</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 shadow-sm text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1"
                    required
                  />
                </div>
                <div className="flex gap-5 flex-wrap md:flex-nowrap justify-between ">
                  <label className="sm:w-32">{t('Languages')}:</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 shadow-sm text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1"
                    required
                  />
                </div>
                <div className="flex gap-5 flex-wrap md:flex-nowrap justify-between ">
                  <label className="sm:w-32 mt-1">{t('perAddress')}:</label>
                  <textarea
                    rows="3"
                    className="w-full border border-gray-300 shadow-sm text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1"
                    placeholder="more...."
                  />
                </div>
                <div className="flex gap-5 flex-wrap md:flex-nowrap justify-between ">
                  <label className="sm:w-32 mt-1">{t('curAddress')}:</label>
                  <textarea
                    rows="3"
                    className="w-full border border-gray-300 shadow-sm text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1"
                    placeholder="more...."
                  />
                </div>
              </div>

              <div className="w-full  space-y-1 p-2">
                <div className="flex gap-2 flex-wrap md:flex-nowrap justify-between ">
                  <label className="sm:w-32 mt-1">{t('PhoneNo')}:</label>
                  <input
                    id=""
                    type="checkbox"
                    value=""
                    name="bordered-checkbox"
                    class="w-4 h-4  bg-gray-100 mt-3 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"
                  />
                  <div class="relative">
                    <div class="absolute  inset-y-0 start-0 top-0 flex items-center ps-3 pointer-events-none">
                      <BsPhone />
                    </div>
                    <input
                      type="text"
                      id="phone-input"
                      aria-describedby="helper-text-explanation"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                      placeholder="123-456-7890"
                      required
                    />
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap md:flex-nowrap justify-between ">
                  <label className="sm:w-32 mt-1">{t('WhatsApp')}:</label>
                  <input
                    id=""
                    type="checkbox"
                    value=""
                    name="bordered-checkbox"
                    class="w-4 h-4  bg-gray-100 mt-3 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"
                  />
                  <div class="relative">
                    <div class="absolute  inset-y-0 start-0 top-0 flex items-center ps-3 pointer-events-none">
                      <BsWhatsapp />
                    </div>
                    <input
                      type="text"
                      id="phone-input"
                      aria-describedby="helper-text-explanation"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                      placeholder="123-456-7890"
                      required
                    />
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap md:flex-nowrap justify-between ">
                  <label className="sm:w-32 mt-1">{t('Email')}:</label>
                  <input
                    id=""
                    type="checkbox"
                    value=""
                    name="bordered-checkbox"
                    class="w-4 h-4  bg-gray-100 mt-3 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"
                  />
                  <div class="relative">
                    <div class="absolute  inset-y-0 start-0 top-0 flex items-center ps-3 pointer-events-none">
                      <RiMailFill />
                    </div>
                    <input
                      type="text"
                      id="phone-input"
                      aria-describedby="helper-text-explanation"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@gmail.com"
                      required
                    />
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap md:flex-nowrap justify-between ">
                  <label className="sm:w-32 mt-1">{t('Telegram')}:</label>
                  <input
                    id=""
                    type="checkbox"
                    value=""
                    name="bordered-checkbox"
                    class="w-4 h-4  bg-gray-100 mt-3 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"
                  />
                  <div class="relative">
                    <div class="absolute  inset-y-0 start-0 top-0 flex items-center ps-3 pointer-events-none">
                      <BsTelegram />
                    </div>
                    <input
                      type="text"
                      id="phone-input"
                      aria-describedby="helper-text-explanation"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                      placeholder="123-456-7890"
                      required
                    />
                  </div>
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

export default CustomerAdd;
