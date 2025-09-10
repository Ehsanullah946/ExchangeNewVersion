import React, { useState } from 'react';
import { useStateContext } from '../../../context/contextProvider';
import { BiSolidDetail } from 'react-icons/bi';
import Button from '../../../components/layout/Button';
import { useTranslation } from 'react-i18next';
import { BiSolidEdit } from 'react-icons/bi';

const Customers = () => {
  const { t } = useTranslation();

  return (
    <div className="relative overflow-x-auto rtl:ml-4 shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 hidden md:table-header-group">
          <tr>
            <th scope="col" className="px-6 py-3">
              {t('FullName')}
            </th>
            <th scope="col" className="px-6 py-3">
              {t('Account No')}
            </th>
            <th scope="col" className="px-6 py-3">
              {t('User Name')}
            </th>
            <th scope="col" className="px-6 py-3">
              {t('Phone')}
            </th>
            <th scope="col" className="px-6 py-3">
              {t('Transactions')}
            </th>
            <th scope="col" className="px-6 py-3">
              {t('Details')}
            </th>
            <th scope="col" className="px-6 py-3">
              {t('Edit')}
            </th>
            <th scope="col" className="px-6 py-3">
              {t('Delete')}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 flex flex-col md:table-row">
            <td
              className="px-6 py-4 font-medium text-gray-900 dark:text-white"
              data-label={t('FullName')}
            >
              احسان الله اکبری
            </td>
            <td className="px-6 py-4" data-label={t('Account No')}>
              4
            </td>
            <td className="px-6 py-4" data-label={t('User Name')}>
              Ehsan@
            </td>
            <td className="px-6 py-4" data-label={t('Phone')}>
              0798987430
            </td>
            <td className="px-6 py-4" data-label={t('Transactions')}>
              <Button type="primary">transactions</Button>
            </td>
            <td className="px-6 py-4" data-label={t('Details')}>
              <BiSolidDetail className="text-lg text-blue-600 cursor-pointer" />
            </td>
            <td className="px-6 py-4" data-label={t('Edit')}>
              <BiSolidEdit className="text-lg text-blue-600 cursor-pointer" />
            </td>
            <td className="px-6 py-4" data-label={t('Delete')}>
              ❌
            </td>
          </tr>
        </tbody>
      </table>

      {/* Pagination */}
      <nav
        className="flex items-center flex-col md:flex-row justify-between pt-4"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0">
          Showing{' '}
          <span className="font-semibold text-gray-900 dark:text-white">
            1-10
          </span>{' '}
          of{' '}
          <span className="font-semibold text-gray-900 dark:text-white">
            1000
          </span>
        </span>
        <ul className="inline-flex -space-x-px text-sm h-8">
          <li>
            <a
              href="#"
              className="px-3 h-8 flex items-center border rounded-s-lg"
            >
              Prev
            </a>
          </li>
          <li>
            <a href="#" className="px-3 h-8 flex items-center border">
              1
            </a>
          </li>
          <li>
            <a
              href="#"
              className="px-3 h-8 flex items-center border bg-blue-50 text-blue-600"
            >
              2
            </a>
          </li>
          <li>
            <a
              href="#"
              className="px-3 h-8 flex items-center border rounded-e-lg"
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Customers;
