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
  const [search, setSearch] = useState('');
  const [phone, setPhone] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [debouncedPhone, setDebouncedPhone] = useState(phone);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(handler);
  }, [search]);

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

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Error loading branches: {error.message}
      </div>
    );
  }

  return (
    <div className="relative overflow-x-auto rtl:ml-4 ltr:mr-4 shadow-xl sm:rounded-lg">
      {/* Search + Add button */}
      <div className="flex mt-1 mb-2 gap-2">
        <Link to="/management/branchAdd">
          <Button type="primary">{t('Add New Branch')}</Button>
        </Link>

        <input
          type="text"
          placeholder={t('Search by name')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-1 flex-1"
        />

        <input
          type="text"
          placeholder={t('Search by phone')}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border rounded px-3 py-1 flex-1"
        />
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Error: {error.message}
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
