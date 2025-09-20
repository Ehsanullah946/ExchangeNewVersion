// components/Branches.js
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../../../components/layout/Button';
import { Link } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import { useBranch } from '../../../hooks/useBranch';
import { BiSolidDetail, BiSolidEdit } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import {
  setDebouncedPhone,
  setDebouncedSearch,
  toggleOpen,
  setSearch,
  setPhone,
  setPage,
} from '../../../features/ui/filterSlice';

const Branches = () => {
  const { t } = useTranslation();

  const { debouncedPhone, debouncedSearch, phone, search, open, page, limit } =
    useSelector((state) => state.filters);

  const dispatch = useDispatch();
  useEffect(() => {
    const handler = setTimeout(() => dispatch(setDebouncedSearch(search)), 500);
    return () => clearTimeout(handler);
  }, [search, dispatch]);

  useEffect(() => {
    const handler = setTimeout(() => dispatch(setDebouncedPhone(phone)), 500);
    return () => clearTimeout(handler);
  }, [phone, dispatch]);

  useEffect(() => {
    dispatch(setPage(1));
  }, [debouncedSearch, debouncedPhone, dispatch]);

  const { data, isLoading, error } = useBranch(
    debouncedSearch,
    debouncedPhone,
    limit,
    page
  );

  const branches = data?.data || [];
  const total = data?.total || 0;

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
      {open && (
        <div className="flex gap-2">
          <div className="h-8 flex items-center justify-center bg-gradient-to-b from-[#e3d5ff] to-[#ffe7e7] rounded-2xl overflow-hidden cursor-pointer shadow-md">
            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => dispatch(setPhone(e.target.value))}
              className="h-6 border-none outline-none caret-orange-600 bg-white rounded-[30px] px-3 tracking-[0.8px] text-[#131313] font-serif"
            />
          </div>
        </div>
      )}
      {/* Search + Add button */}
      <div className="flex mt-1 mb-2">
        <Link to="/management/branchAdd">
          <Button type="primary">{t('Add New Branch')}</Button>
        </Link>
        <Button onClick={() => dispatch(toggleOpen(!open))} type="primary">
          {t('Limit Search')}
        </Button>
        <div className="h-8 flex items-center justify-center bg-gradient-to-b from-[#e3d5ff] to-[#ffe7e7] rounded-2xl overflow-hidden cursor-pointer shadow-md">
          <input
            type="text"
            placeholder={t('Search By Name')}
            value={search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
            className="h-6 border-none outline-none caret-orange-600 bg-white rounded-[30px] px-3 tracking-[0.8px] text-[#131313] font-serif"
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border text-center border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error.response?.status === 404
            ? t('No branches found for your search')
            : t('Something went wrong, please try again later')}
        </div>
      )}

      {/* Table */}
      {isLoading ? (
        <div className="p-4 flex justify-center">
          <PulseLoader
            color="green"
            size={15}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-4 py-2">{t('ID')}</th>
                <th className="px-4 py-2">{t('fullname')}</th>
                <th className="px-4 py-2">{t('Account No')}</th>
                <th className="px-4 py-2">{t('Phone')}</th>
                <th className="px-4 py-2">{t('Transactions')}</th>
                <th className="px-4 py-2">{t('Details')}</th>
                <th className="px-4 py-2">{t('Edit')}</th>
                <th className="px-4 py-2">{t('Delete')}</th>
              </tr>
            </thead>
            <tbody>
              {branches.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-4 py-4 text-center">
                    {t('No branches found for your search')}
                  </td>
                </tr>
              ) : (
                branches.map((branch, index) => (
                  <tr
                    key={branch.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="px-4 py-2">
                      {' '}
                      {index + 1 + (page - 1) * limit}
                    </td>
                    <td className="px-4 py-2">
                      {branch.Customer?.Stakeholder?.Person?.firstName || 'N/A'}{' '}
                      {branch.Customer?.Stakeholder?.Person?.lastName || ''}
                    </td>
                    <td className="px-4 py-2">
                      {branch.Customer?.orgCustomerId || 'N/A'}
                    </td>
                    <td className="px-4 py-2">
                      {branch.Customer?.Stakeholder?.Person?.phone || 'N/A'}
                    </td>
                    <td className="px-4 py-2">
                      <Link to={`/management/branch/${branch.id}/transactions`}>
                        <Button type="primary" size="small">
                          {t('Transactions')}
                        </Button>
                      </Link>
                    </td>
                    <td className="px-4 py-2">
                      <BiSolidDetail className="text-lg text-blue-600 cursor-pointer" />
                    </td>
                    <td className="px-4 py-2">
                      <BiSolidEdit className="text-lg text-blue-600 cursor-pointer" />
                    </td>
                    <td className="px-4 py-2">
                      <span className="text-red-600 cursor-pointer">❌</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div className="">
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
                    onClick={() => dispatch(setPage((p) => Math.max(p - 1, 1)))}
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
                        setPage((p) =>
                          Math.min(p + 1, Math.ceil(total / limit))
                        )
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
        </div>
      )}
    </div>
  );
};

export default Branches;
