import React, { useEffect, useState } from 'react';
import { BiSolidEdit, BiSolidUserAccount } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';
import Button from '../../components/layout/Button';
import { Link } from 'react-router-dom';
import { BsPrinter, BsSearch } from 'react-icons/bs';
import { PulseLoader } from 'react-spinners';
import { BsSend } from 'react-icons/bs';
import { RiExchange2Fill } from 'react-icons/ri';
import {
  setDebouncedSearch,
  setPage,
  setSearch,
  toggleOpen,
} from '../../features/ui/filterSlice';
import { useExchange } from '../../hooks/useExchange';
import { useDispatch, useSelector } from 'react-redux';
import { useCustomers } from '../../hooks/useCustomers';
const ExchangeList = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const { search, page, limit, open, debouncedSearch } = useSelector(
    (state) => state.filters
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const handler = setTimeout(() => dispatch(setDebouncedSearch(search)), 500);
    return () => clearTimeout(handler);
  }, [search, dispatch]);

  useEffect(() => {
    dispatch(setPage(1));
  }, [debouncedSearch, dispatch]);

  const { data, isLoading, error } = useExchange(debouncedSearch, limit, page);

  // const { data: customerRespons } = useCustomers();

  // const customers = customerRespons?.data || [];

  const exchanges = data || [];
  const total = data?.total || 0;

  console.log('exchange data:', exchanges);

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
        <Link to="/rates/exchange">
          <Button type="primary">
            <span className="flex gap-1">
              {t('Exchange')} <RiExchange2Fill className="mt-1" />
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
        <div class="h-8 flex items-center justify-center bg-gradient-to-b from-[#e3d5ff] to-[#ffe7e7] rounded-2xl overflow-hidden cursor-pointer shadow-md">
          <input
            type="text"
            name="text"
            id="input"
            placeholder={t('Search')}
            class="h-6 border-none outline-none caret-orange-600 bg-white rounded-[30px] px-3 tracking-[0.8px] text-[#131313] font-serif"
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
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className=" text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 hidden md:table-header-group">
            <tr>
              <th className="px-3 py-2">{t('Number')}</th>
              <th className="px-3 py-2">{t('Rates')}</th>
              <th className="px-3 py-2">{t('Sel Amount')}</th>
              <th className="px-3 py-2">{t('Sel Currency')}</th>
              <th className="px-3 py-2">{t('Purches Amount')}</th>
              <th className="px-3 py-2">{t('Purches Currency')}</th>
              <th className="px-3 py-2">{t('Exchanger')}</th>
              <th className="px-3 py-2">{t('Customer')}</th>
              <th className="px-3 py-2">{t('Date')}</th>
              <th className="px-3 py-2">{t('Description')}</th>
              <th className="px-3 py-2">{t('Print')}</th>
              <th className="px-3 py-2">{t('Edit')}</th>
              <th className="px-3 py-2">{t('Delete')}</th>
            </tr>
          </thead>
          <tbody>
            {exchanges.length === 0 ? (
              <tr>
                <td
                  colSpan="8"
                  className="px-4 py-4 font-bold text-xl text-center"
                >
                  {t('No exchang found for your search')}
                </td>
              </tr>
            ) : (
              exchanges.map((c, index) => (
                <tr
                  key={c.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 flex flex-col md:table-row"
                >
                  <td className="px-3 py-2">{c.id}</td>
                  <td className="px-3 py-2">{c.rate}</td>
                  <td className="px-3 py-2">{c.saleAmount}</td>
                  <td className="px-3 py-2">{c.SaleType?.typeName}</td>
                  <td className="px-3 py-2">{c.purchaseAmount}</td>
                  <td className="px-3 py-2">{c.PurchaseType?.typeName}</td>
                  <td className="px-3 py-2">null</td>
                  <td className="px-3 py-2">
                    {c.Customer?.Stakeholder?.Person?.firstName || c.firstName}
                  </td>
                  <td dir="ltr" className="px-3 py-2">
                    {' '}
                    {new Date(c.eDate)
                      .toISOString()
                      .slice(0, 16)
                      .replace('T', ' ')}
                  </td>
                  <td className="px-3 py-2">{c.description}</td>
                  <td className="px-3 py-2">
                    <BsPrinter className="text-lg text-blue-600 cursor-pointer" />
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
      )}
    </div>
  );
};

export default ExchangeList;
