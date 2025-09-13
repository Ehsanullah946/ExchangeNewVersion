import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BiSolidDetail, BiSolidEdit } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';
import Button from '../../../components/layout/Button';
import { Link } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';

const Customers = () => {
  const { t } = useTranslation();
  const [customers, setCustomers] = useState([
    { id: 1, firstName: 'Ehsan', lastName: 'Akbari', phone: '0790686384' },
    { id: 2, firstName: 'Ahmad', lastName: 'Amiri', phone: '0790686384' },
    { id: 3, firstName: 'Ali', lastName: 'Hosaini', phone: '0794324323' },
    { id: 4, firstName: 'kamal', lastName: 'Jamali', phone: '07903243243' },
    { id: 5, firstName: 'Mahmod', lastName: 'Safari', phone: '0793243244' },
  ]);
  const [search, setSearch] = useState(''); // search query
  const [loading, setLoading] = useState(false);

  // Fetch customers
  const fetchCustomers = async (query = '') => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:3000/api/v1/customer`, {
        params: { search: query },
      });
      const result = Array.isArray(res.data) ? res.data : res.data.data || [];
      setCustomers(result);
    } catch (err) {
      console.error('Error fetching customers:', err);
      // keep default instead of clearing
      if (query === '') {
        setCustomers([
          {
            id: 1,
            firstName: 'Ehsan',
            lastName: 'Akbari',
            phone: '0790686384',
          },
          { id: 2, firstName: 'Ahmad', lastName: 'Amiri', phone: '0790686384' },
          { id: 3, firstName: 'Ali', lastName: 'Hosaini', phone: '0794324323' },
          {
            id: 4,
            firstName: 'kamal',
            lastName: 'Jamali',
            phone: '07903243243',
          },
          {
            id: 5,
            firstName: 'Mahmod',
            lastName: 'Safari',
            phone: '0793243244',
          },
        ]);
      } else {
        setCustomers([]);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCustomers('');
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    fetchCustomers(value);
  };

  return (
    <div className="relative overflow-x-auto rtl:ml-4 ltr:mr-4 shadow-xl sm:rounded-lg">
      {/* Search + Add button */}
      <div className="flex mt-1 mb-2">
        <Link to="/management/customerAdd">
          <Button type="primary">{t('Add New Customer')}</Button>
        </Link>

        <input
          type="text"
          placeholder={t('Search')}
          value={search}
          onChange={handleSearch}
          className="border rounded px-1 py-1 flex-1"
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
            {customers.map((c, index) => (
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
