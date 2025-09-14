import React, { useState } from 'react';
import { BiSolidEdit, BiSolidUserAccount } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';
import Button from '../../../components/layout/Button';
import { Link } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { PulseLoader } from 'react-spinners';
import { RiExchangeCnyFill } from 'react-icons/ri';
const ExchangerList = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  return (
    <div className="relative overflow-x-auto rtl:ml-4 ltr:mr-4 shadow-xl sm:rounded-lg">
      {/* Search + Add button */}
      <div className="flex mt-1 mb-2 gap-0.2">
        <Link to="/management/exchangerAdd">
          <Button type="primary">
            <span className="flex gap-1">
              {t('Add New Exchanger')} <RiExchangeCnyFill className="mt-1" />
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
              <th className="px-3 py-2">{t('ID')}</th>
              <th className="px-3 py-2">{t('First Name')}</th>
              <th className="px-3 py-2">{t('Last Name')}</th>
              <th className="px-3 py-2">{t('Father Name')}</th>
              <th className="px-3 py-2">{t('Phone')}</th>
              <th className="px-3 py-2">{t('N-Card')}</th>
              <th className="px-3 py-2">{t('Edit')}</th>
              <th className="px-3 py-2">{t('Delete')}</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 flex flex-col md:table-row">
              <td className="px-3 py-2">1</td>
              <td className="px-3 py-2">احسان الله</td>
              <td className="px-3 py-2">اکبری</td>
              <td className="px-3 py-2">ابراهیم</td>
              <td className="px-3 py-2">0790074323</td>
              <td className="px-3 py-2">97290473</td>
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

export default ExchangerList;
