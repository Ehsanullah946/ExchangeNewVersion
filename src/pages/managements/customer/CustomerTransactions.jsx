import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
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
import { RiAccountBox2Fill, RiAddBoxFill } from 'react-icons/ri';
import {
  BsPrinter,
  BsSearch,
  BsSearchHeartFill,
  BsShare,
} from 'react-icons/bs';
import { PulseLoader } from 'react-spinners';

const CustomerTransactions = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  // Fake data (instead of backend)
  const fakeTransactions = [
    { id: 1, type: 'deposit', amount: 500, createdAt: '2025-09-10T12:30:00' },
    {
      id: 2,
      type: 'withdrawal',
      amount: 200,
      createdAt: '2025-09-11T09:15:00',
    },
    { id: 3, type: 'transfer', amount: 100, createdAt: '2025-09-12T15:45:00' },
  ];

  return (
    <div className="relative overflow-x-auto rtl:ml-4 ltr:mr-4 shadow-xl sm:rounded-lg">
      {/* Search + Add button */}
      <div className="flex mt-1 mb-2 gap-0.2">
        <Link to="/account">
          <Button type="primary">
            <span className="flex gap-1">
              {t('Add New Account')} <BiSolidUserAccount className="mt-1" />
            </span>
          </Button>
        </Link>
        <Link to="/main/withdraw">
          <Button type="primary">
            <span className="flex gap-1">
              {t('Withdraw')} <ImMinus className="mt-1" />
            </span>
          </Button>
        </Link>
        <Link to="/main/deposit">
          <Button type="primary">
            <span className="flex gap-1">
              {t('Deposit')} <RiAddBoxFill className="mt-1" />
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
          className="border rounded px-1 flex-1"
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
              <th className="px-3 py-2">{t('Number')}</th>
              <th className="px-3 py-2">{t('Date')}</th>
              <th className="px-3 py-2">{t('Details')}</th>
              <th className="px-3 py-2">{t('Withdraw')}</th>
              <th className="px-3 py-2">{t('Deposit')}</th>
              <th className="px-3 py-2">{t('Currency')}</th>
              <th className="px-3 py-2">{t('Remain')}</th>
              <th className="px-3 py-2">{t('Status')}</th>
              <th className="px-3 py-2">{t('Print')}</th>
              <th className="px-3 py-2">{t('User')}</th>
              <th className="px-3 py-2">{t('Edit')}</th>
              <th className="px-3 py-2">{t('Delete')}</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 flex flex-col md:table-row">
              <td className="px-3 py-2">1</td>
              <td className="px-3 py-2">{`${new Date().toLocaleDateString()}`}</td>
              <td className="px-3 py-2">کرفت پول از حساب بانک </td>
              <td className="px-3 py-2">40000</td>
              <td className="px-3 py-2">10000</td>
              <td className="px-3 py-2">AFG</td>
              <td className="px-3 py-2">20000</td>
              <td className="px-3 py-2">{t('Owe')}</td>
              <td className="px-3 py-2">
                <BsPrinter color="green" />
              </td>
              <td className="px-3 py-2">
                <BiSolidDetail className="text-lg text-blue-600 cursor-pointer" />
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

export default CustomerTransactions;
