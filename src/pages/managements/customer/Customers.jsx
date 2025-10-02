import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../../../components/layout/Button';
import { Link, useNavigate } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import { useCustomers, useDeleteCustomer } from '../../../hooks/useCustomers';
import { BiSolidDetail, BiSolidEdit } from 'react-icons/bi';

import {
  setDebouncedPhone,
  setDebouncedSearch,
  setPhone,
  setSearch,
  setPage,
  toggleOpen,
} from '../../../features/ui/filterSlice';
import { useDispatch, useSelector } from 'react-redux';

const Customers = () => {
  const { t } = useTranslation();

  const { open, search, phone, limit, page, debouncedPhone, debouncedSearch } =
    useSelector((state) => state.filters);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const deleteMutation = useDeleteCustomer();

  const handleEdit = (id) => {
    navigate(`/management/customer/${id}/edit`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      deleteMutation.mutate(id);
    }
  };

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

  const { data, isLoading, error } = useCustomers(
    debouncedSearch,
    debouncedPhone,
    limit,
    page
  );

  const customers = data?.data || [];
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
      <div className="flex mt-1 mb-2">
        <Link to="/management/customerAdd">
          <Button type="primary">{t('Add New Customer')}</Button>
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
            ? t('No customer found for your search')
            : t('Something went wrong, please try again later')}
        </div>
      )}

      {/* Table */}
      {isLoading ? (
        <p className="p-4 flex justify-center">
          <PulseLoader color="green" size={15} />
        </p>
      ) : (
        <>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 hidden md:table-header-group">
              <tr>
                <th className="px-4 py-2">{t('ID')}</th>
                <th className="px-4 py-2">{t('fullname')}</th>
                <th className="px-4 py-2">{t('Father Name')}</th>
                <th className="px-4 py-2">{t('Phone')}</th>
                <th className="px-4 py-2">{t('Transactions')}</th>
                <th className="px-4 py-2">{t('Details')}</th>
                <th className="px-4 py-2">{t('Edit')}</th>
                <th className="px-4 py-2">{t('Delete')}</th>
              </tr>
            </thead>
            <tbody>
              {customers.length === 0 ? (
                <tr>
                  <td
                    colSpan="8"
                    className="px-4 py-4 font-bold text-xl text-center"
                  >
                    {t('No customer found for your search')}
                  </td>
                </tr>
              ) : (
                customers.map((c, index) => (
                  <tr
                    key={c.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 flex flex-col md:table-row"
                  >
                    <td className="px-3 py-1">
                      {/* {index + 1 + (page - 1) * limit} */}
                      {c.id}
                    </td>
                    <td className="px-3 py-1">
                      {c.Stakeholder?.Person?.firstName || c.firstName}{' '}
                      {c.Stakeholder?.Person?.lastName || c.lastName}
                    </td>
                    <td className="px-3 py-1">
                      {c.Stakeholder?.Person?.fatherName || c.fatherName}
                    </td>
                    <td dir="ltr" className="px-3 py-1">
                      {c.Stakeholder?.Person?.phone || c.phone || '-'}
                    </td>
                    <td className="px-3 py-1">
                      <Link to={`/management/customer/${c.id}/transactions`}>
                        <Button type="primary">{t('Transactions')}</Button>
                      </Link>
                    </td>
                    <td className="px-3 py-1">
                      <BiSolidDetail className="text-lg text-blue-600 cursor-pointer" />
                    </td>
                    <td className="px-3 py-1">
                      <BiSolidEdit
                        onClick={() => handleEdit(c.id)}
                        className="text-lg text-blue-600 cursor-pointer"
                      />
                    </td>
                    <td className="px-3 py-1">
                      {' '}
                      <button
                        onClick={() => handleDelete(c.id)}
                        disabled={deleteMutation.isLoading}
                        className="text-red-600 hover:text-red-800"
                      >
                        ❌
                      </button>
                    </td>
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

export default Customers;
