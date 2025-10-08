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
import { RiAddBoxFill } from 'react-icons/ri';
import { BsPrinter, BsSearch, BsShare } from 'react-icons/bs';
import { PulseLoader } from 'react-spinners';
import { setPage, toggleOpen } from '../../../features/ui/filterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useAllTransaction } from '../../../hooks/useCustomers';

const CustomerTransactions = () => {
  const { customerId } = useParams();
  const { t } = useTranslation();

  const { open, limit, page } = useSelector((state) => state.filters);
  const dispatch = useDispatch();

  const { data, isLoading, error } = useAllTransaction(customerId, limit, page);

  const customerTransaction = data?.data || [];
  const total = data?.total || 0;

  // Add validation
  useEffect(() => {
    if (!customerId) {
      console.error('No customerId found in URL parameters');
    }
  }, [customerId]);

  const totalPages = Math.max(1, Math.ceil(total / limit));

  useEffect(() => {
    if (total > 0 && page > totalPages) {
      dispatch(setPage(totalPages));
    }
    if (total === 0 && page !== 1) {
      dispatch(setPage(1));
    }
  }, [total, totalPages, page, dispatch]);

  return (
    <div className="relative overflow-x-auto rtl:ml-4 ltr:mr-4 shadow-xl sm:rounded-lg">
      <div className="flex mt-1 mb-2 gap-0.2">
        <Link to="/accounts/accountAdd">
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
          className="border rounded px-1 flex-1"
        />
      </div>
      {/* Table */}
      {isLoading ? (
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
        <>
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
                <th className="px-3 py-2">{t('Type')}</th>
                <th className="px-3 py-2">{t('Print')}</th>
                <th className="px-3 py-2">{t('User')}</th>
                <th className="px-3 py-2">{t('Edit')}</th>
                <th className="px-3 py-2">{t('Delete')}</th>
              </tr>
            </thead>
            <tbody>
              {customerTransaction.length === 0 ? (
                <tr>
                  <td
                    colSpan="12"
                    className="px-4 py-4 font-bold text-xl text-center"
                  >
                    {t('No Transaction found for your search')}
                  </td>
                </tr>
              ) : (
                customerTransaction.map((c, index) => (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 flex flex-col md:table-row">
                    <td className="px-3 py-2">
                      {c.No || c.transferNo || c.receiveNo || '-'}
                    </td>

                    <td dir="ltr" className="px-3 py-2">
                      {new Date(c.date).toLocaleDateString('en-GB')}
                    </td>

                    <td className="px-3 py-2">
                      {c.description ||
                        (c.type === 'transfer'
                          ? `${c.senderName || ''} ⬅️ ${c.receiverName || '-'}`
                          : c.type === 'receive'
                          ? `${c.senderName || ''} ⬅️ ${c.receiverName || '-'}`
                          : '-')}
                    </td>

                    <td className="px-3 py-2 text-red-600">
                      {c.withdraw ||
                        (c.type === 'transfer' ? c.transferAmount : '-')}
                    </td>

                    <td className="px-3 py-2 text-green-600">
                      {c.deposit ||
                        (c.type === 'receive' ? c.receiveAmount : '-')}
                    </td>

                    <td className="px-3 py-2">
                      {c.Account?.MoneyType?.typeName ||
                        c.MainMoneyType?.typeName ||
                        '-'}
                    </td>

                    <td
                      dir="ltr"
                      className={`px-3 py-2 ${
                        c.runningBalance < 0 ? 'text-red-600' : ''
                      }`}
                    >
                      {c.runningBalance}
                    </td>
                    <td className="px-3 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-white text-xs ${
                          c.type === 'deposit'
                            ? 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500 text-white-800'
                            : c.type === 'withdraw'
                            ? 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500 text-white-800'
                            : c.type === 'transfer'
                            ? 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500 text-white-800'
                            : c.type === 'receive'
                            ? 'bg-yellow-500'
                            : 'bg-gray-400'
                        }`}
                      >
                        {t(c.type)}
                      </span>
                    </td>
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
                ))
              )}
            </tbody>
          </table>
          <div className="">
            {/* Pagination */}
            <nav
              className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
              aria-label="Table navigation"
            >
              <span className="text-sm font-normal rtl:mr-2  text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                {t('Showing')}{' '}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {(page - 1) * limit + 1}
                </span>{' '}
                -{' '}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {Math.min(page * limit, total)}
                </span>{' '}
                {t('of')}{' '}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {total}
                </span>
              </span>

              <ul className="inline-flex -space-x-px mb-1 rtl:ml-2 rtl:space-x-reverse text-sm h-8">
                {/* Previous */}
                <li>
                  <button
                    onClick={() => dispatch(setPage(Math.max(page - 1, 1)))}
                    disabled={page === 1}
                    className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight border border-gray-300 rounded-s-lg 
                                ${
                                  page === 1
                                    ? 'text-gray-300 bg-gray-100 cursor-not-allowed'
                                    : 'text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                                }`}
                  >
                    {t('Prev')}
                  </button>
                </li>

                {/* Page numbers */}
                {Array.from(
                  { length: Math.ceil(total / limit) },
                  (_, i) => i + 1
                ).map((pageNum) => (
                  <li key={pageNum}>
                    <button
                      onClick={() => dispatch(setPage(pageNum))}
                      className={`flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 
                        ${
                          page === pageNum
                            ? 'text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                            : 'text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                        }`}
                    >
                      {pageNum}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() =>
                      dispatch(
                        setPage(Math.min(page + 1, Math.ceil(total / limit)))
                      )
                    }
                    disabled={page === Math.ceil(total / limit)}
                    className={`flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 rounded-e-lg 
                                 ${
                                   page === Math.ceil(total / limit)
                                     ? 'text-gray-300 bg-gray-100 cursor-not-allowed'
                                     : 'text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                                 }`}
                  >
                    {t('Next')}
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </>
      )}
    </div>
  );
};

export default CustomerTransactions;
