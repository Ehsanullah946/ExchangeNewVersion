import React, { useState } from 'react';
import { useStateContext } from '../../context/contextProvider';
import Select from 'react-select';
import { BiChevronDown } from 'react-icons/bi';
import Button from '../../components/layout/Button';
import { BiMoneyWithdraw } from 'react-icons/bi';
import { BsListCheck, BsPrinter, BsSearch } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
import { FaRegArrowAltCircleUp } from 'react-icons/fa';

const DailyTransaction = () => {
  const { currentColor } = useStateContext();
  const [isActive, setIsActive] = useState(false);
  const { t } = useTranslation();
  return (
    <>
      <div className="grid justify-center">
        <div className=" flex mt-1 mb-1">
          <Button type="secondry">
            <span className="flex justify-between">
              <BsListCheck className="mt-1 ml-3" />
              {t('List')}
            </span>
          </Button>
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
            <div className="font-extrabold bg-blue-400  p-3 ltr:mr-4 rtl:ml-4  rounded-t-2xl text-white  text-center">
              <span>{t('Daily Transaction')}</span>
            </div>
            <div className="grid justify-around sm:grid-cols-2 rounded-b-2xl ltr:mr-4 rtl:ml-4 md:pl-0 pl-10 pr-10 border-b-2 border-t-2 shadow-2xl  ">
              <div className="w-100">
                <div className="flex gap-10 lg:flex  md:block justify-center ml-5 mr-5 mt-1">
                  <label htmlFor="" className="w-30 mt-1">
                    {t('Date')}:
                  </label>
                  <input
                    type="date"
                    id="number"
                    aria-describedby="helper-text-explanation"
                    class="border border-gray-300 shadow-cyan-400 max-w-58 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 focus:outline-indigo-600"
                    required
                  />
                </div>

                <div className="flex gap-10 lg:flex  md:block justify-center ml-5 mr-5 mt-1">
                  <label htmlFor="" className="w-30 mt-1">
                    {t('Number')}:
                  </label>
                  <input
                    type="text"
                    id="number"
                    aria-describedby="helper-text-explanation"
                    class="border border-gray-300 shadow-cyan-400 max-w-58 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 focus:outline-indigo-600"
                    required
                  />
                </div>
                <div className="flex gap-10 lg:flex md:block justify-center ml-5 mr-5 mt-1">
                  <label htmlFor="" className="mt-1 w-30">
                    {t('Customer')}:
                  </label>
                  <Select
                    className="w-full max-w-58 bg-white shadow-2xl"
                    name="branch"
                    // value={{ label: formData.branch, value: formData.branch }}
                    // options={branch.map((item) => ({
                    //   label: item.firstName,
                    //   value: item.firstName,
                    // }))}
                    isSearchable
                  />
                </div>

                <div className="flex gap-10 lg:flex  md:block justify-center  ml-5 mr-5 mt-1">
                  <label htmlFor="" className="w-30 mt-1 ">
                    {t('Amount')}:
                  </label>
                  <div className="flex items-center max-w-60  rounded-md bg-white pl-2 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                    <div className="shrink-0 text-base pl-1 rtl:mr-5 text-gray-500 select-none sm:text-sm/6">
                      $
                    </div>
                    <input
                      id="price"
                      name="price"
                      type="text"
                      placeholder="0.00"
                      className="block min-w-0 grow py-1.5 pr-2 w-48 ltr:w-53 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                    />
                    <div className="grid shrink-0 grid-cols-1 focus-within:relative">
                      <select
                        id="currency"
                        name="currency"
                        aria-label="Currency"
                        className="col-start-1 row-start-1 ltr:mr-3  appearance-none rounded-md py-1.5 pr-3 ml-2 pl-2 text-base text-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      >
                        <option>USD</option>
                        <option>CAD</option>
                        <option>EUR</option>
                      </select>
                      <BiChevronDown
                        aria-hidden="true"
                        className="pointer-events-none col-start-1 row-start-1 mr-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-10 justify-center md:block lg:flex ml-5 mr-5 mt-1">
                  <label htmlFor="" className="mt-1 w-30">
                    {t('Description')}:
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    class="border border-gray-300 shadow-cyan-400 max-w-58 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 focus:outline-indigo-600"
                    placeholder="more..."
                  ></textarea>
                </div>
                <div className="mt-4 flex mb-2 justify-center ml-3">
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
                      <Button type="primary">{t('Complete')}</Button>
                    </>
                  )}
                </div>
              </div>
              <div className="w-100 p-3">
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

                <div class="relative overflow-x-auto shadow-2xl sm:rounded-lg">
                  <table class="w-full text-sm text-left rtl:text-right text-blue-100 dark:text-blue-100">
                    <thead class="text-xs text-white uppercase bg-blue-600 dark:text-white">
                      <tr>
                        <th scope="col" class="px-3 py-1">
                          {t('Credit')}
                        </th>
                        <th scope="col" class="px-3 py-1">
                          {t('Owe')}
                        </th>
                        <th scope="col" class="px-3 py-1">
                          {t('Currency')}
                        </th>
                        <th scope="col" class="px-3 py-1">
                          {t('Total')}
                        </th>
                        <th scope="col" class="px-3 py-1">
                          {t('Status')}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="bg-blue-500 border-b border-blue-400">
                        <th
                          scope="row"
                          class="px-3 py-2 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100"
                        >
                          50000
                        </th>
                        <td class="">30000</td>
                        <td class="">AFG</td>
                        <td class="">4300</td>
                        <td class="">بدهکار</td>
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

export default DailyTransaction;
