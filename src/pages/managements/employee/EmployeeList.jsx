import { useParams } from 'react-router-dom';
import React, { useState } from 'react';
import {
  BiShare,
  BiSolidDetail,
  BiSolidEdit,
  BiSolidUserAccount,
} from 'react-icons/bi';
import { useTranslation } from 'react-i18next';
import Button from '../../../components/layout/Button';
import { Link } from 'react-router-dom';
import { ImMinus } from 'react-icons/im';
import { RiAddBoxFill } from 'react-icons/ri';
import { BsPrinter, BsSearch, BsShare } from 'react-icons/bs';
import { PulseLoader } from 'react-spinners';
const EmployeeList = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  return (
    <div className="relative overflow-x-auto rtl:ml-4 ltr:mr-4 shadow-xl sm:rounded-lg">
      {/* Search + Add button */}
      <div className="flex mt-1 mb-2 gap-0.2">
        <Link to="">
          <Button type="primary">
            <span className="flex gap-1">
              {t('Add New Account')} <BiSolidUserAccount className="mt-1" />
            </span>
          </Button>
        </Link>
        <Link to="">
          <Button type="primary">
            <span className="flex gap-1">
              {t('Limit Search')} <BsSearch className="mt-1" />
            </span>
          </Button>
        </Link>
        <Link to="">
          <Button type="primary">
            <span className="flex gap-1">
              {t('Liquidate')} <BiSolidUserAccount className="mt-1" />
            </span>
          </Button>
        </Link>
        <Link to="">
          <Button type="primary">
            <span className="flex gap-1">
              {t('Print')} <BsPrinter className="mt-1" />
            </span>
          </Button>
        </Link>
        <Link to="">
          <Button type="primary">
            <span className="flex gap-1">
              {t('Share')} <BsShare className="mt-1" />
            </span>
          </Button>
        </Link>

        <input
          type="text"
          placeholder={t('Search')}
          //   value={search}
          //   onChange={handleSearch}
          className="border rounded-2xl px-1 flex-1"
        />
      </div>

      {/* Table */}
      {loading ? (
        <p className="p-4">
          {
            <PulseLoader
              color="green"
              size={15}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          }
        </p>
      ) : (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className=" text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 hidden md:table-header-group">
            <tr>
              <th className="px-3 py-2">{t('Transaction No')}</th>
              <th className="px-3 py-2">{t('Transfer')}</th>
              <th className="px-3 py-2">{t('Receiver')}</th>
              <th className="px-3 py-2">{t('Withdraw')}</th>
              <th className="px-3 py-2">{t('Deposit')}</th>
              <th className="px-3 py-2">{t('Currency')}</th>
              <th className="px-3 py-2">{t('charges')}</th>
              <th className="px-3 py-2">{t('charges Type')}</th>
              <th className="px-3 py-2">{t('Date')}</th>
              <th className="px-3 py-2">{t('Print')}</th>
              <th className="px-3 py-2">{t('Edit')}</th>
              <th className="px-3 py-2">{t('Delete')}</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 flex flex-col md:table-row">
              <td className="px-3 py-2">1</td>
              <td className="px-3 py-2">احسان الله</td>
              <td className="px-3 py-2">سردار</td>
              <td className="px-3 py-2">40000</td>
              <td className="px-3 py-2">0</td>
              <td className="px-3 py-2">AFG</td>
              <td className="px-3 py-2">100</td>
              <td className="px-3 py-2">{t('AFG')}</td>
              <td className="px-3 py-2">{`${new Date().toLocaleDateString()}`}</td>
              <td className="px-3 py-2">
                <BsPrinter color="green" />
              </td>
              <td className="px-3 py-2">
                <BiSolidEdit className="text-lg text-blue-600 cursor-pointer" />
              </td>
              <td className="px-3 py-2">❌</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmployeeList;
