// components/Branches.js
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../../../components/layout/Button';
import { Link } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import { useBranch } from '../../../hooks/useBranch';
import { BiSolidDetail, BiSolidEdit } from 'react-icons/bi';

const Branches = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [phone, setPhone] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(handler);
  }, [search]);

  const [debouncedPhone, setDebouncedPhone] = useState(phone);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedPhone(phone), 500);
    return () => clearTimeout(handler);
  }, [phone]);

  const {
    data: branches = [],
    isLoading,
    error,
  } = useBranch(debouncedSearch, debouncedPhone);

  console.log('Branches data:', branches);

  return (
    <div className="relative overflow-x-auto rtl:ml-4 ltr:mr-4 shadow-xl sm:rounded-lg">
      {open && (
        <div className="flex gap-2">
          <div className="h-8 flex items-center justify-center bg-gradient-to-b from-[#e3d5ff] to-[#ffe7e7] rounded-2xl overflow-hidden cursor-pointer shadow-md">
            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
        <Button onClick={() => setOpen(!open)} type="primary">
          {t('Limit Search')}
        </Button>
        <div className="h-8 flex items-center justify-center bg-gradient-to-b from-[#e3d5ff] to-[#ffe7e7] rounded-2xl overflow-hidden cursor-pointer shadow-md">
          <input
            type="text"
            placeholder={t('Search By Name')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
                    {t('No branches found')}
                  </td>
                </tr>
              ) : (
                branches.map((branch, index) => (
                  <tr
                    key={branch.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="px-4 py-2">{index + 1}</td>
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
        </div>
      )}
    </div>
  );
};

export default Branches;
