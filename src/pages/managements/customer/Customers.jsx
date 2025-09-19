import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BiSolidDetail, BiSolidEdit } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';
import Button from '../../../components/layout/Button';
import { Link } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import { useCustomers } from '../../../hooks/useCustomers';
const Customers = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [phone, setPhone] = useState('');
  const [open, setOpen] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 500); // 500ms delay
    return () => clearTimeout(handler);
  }, [search]);

  const [debouncedPhone, setDebouncedPhone] = useState(phone);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedPhone(phone), 500);
    return () => clearTimeout(handler);
  }, [phone]);

  const { data: customers, isLoading } = useCustomers(
    debouncedSearch,
    debouncedPhone
  );

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
        <Link to="/management/customerAdd">
          <Button type="primary">{t('Add New Customer')}</Button>
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
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 hidden md:table-header-group">
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
            {customers?.map((c, index) => (
              <tr
                key={c.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 flex flex-col md:table-row"
              >
                <td className="px-3 py-1">{index + 1}</td>
                <td className="px-3 py-1">
                  {c.Stakeholder?.Person?.firstName || c.firstName}{' '}
                  {c.Stakeholder?.Person?.lastName || c.lastName}
                </td>
                <td className="px-3 py-1">{c.orgCustomerId}</td>
                <td className="px-3 py-1">
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
                  <BiSolidEdit className="text-lg text-blue-600 cursor-pointer" />
                </td>
                <td className="px-3 py-1">❌</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Customers;
