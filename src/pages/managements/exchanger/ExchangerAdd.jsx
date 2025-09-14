import React, { useState } from 'react';
import { useStateContext } from '../../../context/contextProvider';
import Select from 'react-select';
import Button from '../../../components/layout/Button';
import { BsListCheck, BsPrinter, BsSearch } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
import { RiAccountBox2Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
const ExchangerAdd = () => {
  const { isActive, setIsActive } = useStateContext();
  const { t } = useTranslation();
  return (
    <>
      <div className="grid justify-center">
        <div className="flex mt-1 mb-1">
          <Link to="/management/exchangerList">
            <Button type="primary">
              <span className="flex justify-between">
                <BsListCheck className="mt-1 ml-3" />
                {t('List')}
              </span>
            </Button>
          </Link>
          <Button type="primary">
            <span className="flex justify-between ">
              <BsPrinter className="mt-1 ml-3" /> {t('Print')}
            </span>
          </Button>
          <Button type="primary">
            <span className="flex justify-between ">
              <BsSearch className="mt-1 ml-3" /> {t('Search')}
            </span>
          </Button>
          <div class="h-8 flex items-center justify-center bg-gradient-to-b from-[#e3d5ff] to-[#ffe7e7] rounded-2xl overflow-hidden cursor-pointer shadow-md">
            <input
              type="text"
              name="text"
              id="input"
              placeholder={t('Search')}
              class="h-6 border-none outline-none caret-orange-600 bg-white rounded-[30px] px-3 tracking-[0.8px] text-[#131313] font-serif"
            />
          </div>
        </div>
        <div>
          <form>
            <div className="font-extrabold bg-blue-400 w-full  p-3 ltr:mr-4 rtl:ml-4  rounded-t-2xl text-white  text-center">
              <span className="flex justify-center gap-3 ">
                {t('Exchanger')} <FaUser className="mt-1" />
              </span>
            </div>
            <div className="grid gap-6 p-3 rounded-b-2xl ltr:mr-4 rtl:ml-4 px-4 md:px-6 lg:px-10 border-b-2 border-t-2 shadow-2xl w-full max-w-7xl mx-auto">
              <div className=" space-y-1 w-full">
                <div className="flex gap-6 flex-wrap md:flex-nowrap justify-between">
                  <label className="sm:w-32 mt-2">{t('ID')}:</label>
                  <input
                    type="text"
                    className="border border-gray-300 shadow-sm text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
                    required
                  />
                </div>
                <div className="flex gap-6 flex-wrap md:flex-nowrap justify-between">
                  <label className="sm:w-32 mt-2">{t('First Name')}:</label>
                  <input
                    type="text"
                    className="border border-gray-300 shadow-sm text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
                    required
                  />
                </div>
                <div className="flex gap-6 flex-wrap md:flex-nowrap justify-between">
                  <label className="sm:w-32 mt-2">{t('Last Name')}:</label>
                  <input
                    type="text"
                    className="border border-gray-300 shadow-sm text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
                    required
                  />
                </div>
                <div className="flex gap-6 flex-wrap md:flex-nowrap justify-between">
                  <label className="sm:w-32 mt-2">{t('Father Name')}:</label>
                  <input
                    type="text"
                    className="border border-gray-300 shadow-sm text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
                    required
                  />
                </div>
                <div className="flex gap-6 flex-wrap md:flex-nowrap justify-between">
                  <label className="sm:w-32 mt-2">{t('PhoneNo')}:</label>
                  <input
                    type="text"
                    className="border border-gray-300 shadow-sm text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
                    required
                  />
                </div>
                <div className="flex gap-6 flex-wrap md:flex-nowrap justify-between">
                  <label className="sm:w-32 mt-2">{t('N-Card')}:</label>
                  <input
                    type="text"
                    className="border border-gray-300 shadow-sm text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
                    required
                  />
                </div>

                <div className="flex flex-wrap  mt-3 justify-center sm:justify-start">
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
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ExchangerAdd;
