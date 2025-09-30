import React, { useEffect, useState } from 'react';
import { BiSolidEdit, BiSolidUserAccount } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';
import Button from '../../../components/layout/Button';
import { Link, useNavigate } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { PulseLoader } from 'react-spinners';

import {
  setDebouncedPhone,
  setDebouncedSearch,
  setPage,
  setPhone,
  setSearch,
  toggleOpen,
} from '../../../features/ui/filterSlice';
import { useDeleteEmployee, useEmployee } from '../../../hooks/useEmployee';
import { useDispatch, useSelector } from 'react-redux';
const EmployeeList = () => {
  const { t } = useTranslation();

  const { phone, search, page, limit, debouncedPhone, debouncedSearch, open } =
    useSelector((state) => state.filters);

  const dispatch = useDispatch();

  useEffect(() => {
    const handler = setTimeout(() => dispatch(setDebouncedPhone(phone)), 500);
    return () => clearTimeout(handler);
  }, [phone, dispatch]);

  useEffect(() => {
    const handler = setTimeout(() => dispatch(setDebouncedSearch(search)), 500);
    return () => clearTimeout(handler);
  }, [search, dispatch]);

  const { data, isLoading, error } = useEmployee(
    debouncedSearch,
    debouncedPhone,
    limit,
    page
  );

  const navigate = useNavigate();
  const deleteMutation = useDeleteEmployee();

  const handleEdit = (id) => {
    navigate(`/management/employee/${id}/edit`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      deleteMutation.mutate(id);
    }
  };

  useEffect(() => {
    dispatch(setPage(1));
  }, [debouncedPhone, debouncedSearch, dispatch]);

  const employees = data?.data || [];
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
        <Link to="/management/employeeAdd">
          <Button type="primary">{t('Add New Employee')}</Button>
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
                <th className="px-3 py-2">{t('ID')}</th>
                <th className="px-3 py-2">{t('First Name')}</th>
                <th className="px-3 py-2">{t('Last Name')}</th>
                <th className="px-3 py-2">{t('Father Name')}</th>
                <th className="px-3 py-2">{t('Job')}</th>
                <th className="px-3 py-2">{t('N-Card')}</th>
                <th className="px-3 py-2">{t('Phone')}</th>
                <th className="px-3 py-2">{t('Net Salary')}</th>
                {/* <th className="px-3 py-2">{t('Account Type')}</th> */}
                <th className="px-3 py-2">{t('Edit')}</th>
                <th className="px-3 py-2">{t('Delete')}</th>
              </tr>
            </thead>
            <tbody>
              {employees.length === 0 ? (
                <tr>
                  <td colSpan="10" className="px-4 py-4 text-center">
                    {t('No Employee found for your search')}
                  </td>
                </tr>
              ) : (
                employees.map((e, index) => (
                  <tr
                    key={e.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 flex flex-col md:table-row"
                  >
                    <td className="px-3 py-2">
                      {' '}
                      {index + 1 + (page - 1) * limit}
                    </td>
                    <td className="px-3 py-2">
                      {' '}
                      {e.Stakeholder?.Person?.firstName || e.firstName}{' '}
                    </td>
                    <td className="px-3 py-2">
                      {' '}
                      {e.Stakeholder?.Person?.lastName || e.lastName}
                    </td>
                    <td className="px-3 py-2">
                      {' '}
                      {e.Stakeholder?.Person?.fatherName || e.fatherName}
                    </td>
                    <td className="px-3 py-2">
                      {' '}
                      {e.Stakeholder?.job || e.job}
                    </td>
                    <td className="px-3 py-2">
                      {' '}
                      {e.Stakeholder?.Person?.nationalCode || e.nationalCode}
                    </td>
                    <td className="px-3 py-2">
                      {' '}
                      {e.Stakeholder?.Person?.phone || e.phone || '-'}
                    </td>
                    <td className="px-3 py-2">
                      {' '}
                      {e.Stakeholder?.orgCustomerId || 'N/A'}
                    </td>
                    {/* <td className="px-3 py-2">{t('AFG')}</td> */}
                    <td className="px-3 py-1">
                      <BiSolidEdit
                        onClick={() => handleEdit(e.id)}
                        className="text-lg text-blue-600 cursor-pointer"
                      />
                    </td>
                    <td className="px-3 py-1">
                      {' '}
                      <button
                        onClick={() => handleDelete(e.id)}
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

export default EmployeeList;
