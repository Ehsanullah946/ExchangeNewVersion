import React, { useState } from 'react';
import { useStateContext } from '../../../context/contextProvider';
import Select from 'react-select';
import { BiChevronDown } from 'react-icons/bi';
import Button from '../../../components/layout/Button';
import { BsListCheck, BsPrinter, BsSearch } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';

const TransferToAccount = () => {
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
            <div className="font-extrabold bg-blue-400 p-3 ltr:mr-4 rtl:ml-4  rounded-t-2xl text-white  text-center">
              <span>{t('TransferToAccount')}</span>
            </div>
            <div className="grid justify-around sm:grid-cols-2 rounded-b-2xl ltr:mr-4 rtl:ml-4 md:pl-0 pl-10 pr-10 border-b-2 border-t-2 shadow-2xl">
              <div className="w-100">
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
                    {t('From Account')}:
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
                <div className="flex gap-10 lg:flex md:block justify-center ml-5 mr-5 mt-1">
                  <label htmlFor="" className="mt-1 w-30">
                    {t('To Account')}:
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

                <div className="flex gap-10 justify-center md:block lg:flex ml-5 mr-5 mt-1">
                  <label htmlFor="" className="mt-1 w-30">
                    {t('Description')}:
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    class="border border-gray-300 shadow-cyan-400 max-w-58 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 focus:outline-indigo-600"
                    placeholder="بشتر ..........."
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
                <p className="text-md mb-1 font-semibold">{t('Account')}</p>
                <hr className="mb-3" />
                <div class="relative overflow-x-auto shadow-2xl sm:rounded-lg">
                  <table class="w-full text-sm text-left rtl:text-right text-blue-100 dark:text-blue-100">
                    <thead class="text-xs text-center text-white uppercase bg-blue-600 dark:text-white">
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
                      <tr class="bg-blue-500 text-center border-b border-blue-400">
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

export default TransferToAccount;
