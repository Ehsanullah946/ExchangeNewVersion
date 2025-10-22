// components/RateList.js - Modern Styling
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useToast } from '../../hooks/useToast';
import {
  BsPlus,
  BsPencil,
  BsTrash,
  BsEye,
  BsCheckCircle,
  BsXCircle,
  BsSearch,
  BsFilter,
} from 'react-icons/bs';
import { PulseLoader } from 'react-spinners';
import { useDeleteRate, useRates } from '../../hooks/useRate';

const RateList = ({ onAddRate, onEditRate, onViewRate }) => {
  const { t } = useTranslation();
  const toast = useToast();
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    currency: '',
    active: '',
  });

  const { data, isLoading, error } = useRates(page, 50, filters);
  const deleteRateMutation = useDeleteRate();

  const handleDelete = async (id) => {
    if (window.confirm(t('Are you sure you want to deactivate this rate?'))) {
      try {
        await deleteRateMutation.mutateAsync(id);
        toast.success(t('Rate deactivated successfully'));
      } catch (error) {
        toast.error(t('Failed to deactivate rate'));
      }
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  if (error) {
    return (
      <div className="p-8 text-center">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 max-w-md mx-auto">
          <BsXCircle className="text-red-500 text-3xl mx-auto mb-3" />
          <div className="text-red-800 font-semibold">
            {t('Error loading rates')}
          </div>
          <div className="text-red-600 text-sm mt-1">{error.message}</div>
        </div>
      </div>
    );
  }

  const rates = data?.data || [];
  const total = data?.total || 0;
  const totalPages = data?.totalPages || 1;

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-slate-50 to-blue-50/50 border-b border-gray-100">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
              {t('Exchange Rates')}
            </h1>
            <p className="text-gray-600 mt-2 text-lg">
              {t('Manage and monitor currency exchange rates in real-time')}
            </p>
          </div>
          <button
            onClick={onAddRate}
            className="group flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <BsPlus className="text-xl group-hover:rotate-90 transition-transform duration-300" />
            <span className="font-semibold">{t('Add New Rate')}</span>
          </button>
        </div>

        {/* Enhanced Filters */}
        <div className="mt-3 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <BsSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={t('Search currencies...')}
              className="w-full pl-12 pr-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all duration-300"
              value={filters.currency}
              onChange={(e) => handleFilterChange('currency', e.target.value)}
            />
          </div>
          <div className="relative">
            <BsFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              className="pl-12 pr-8 py-3 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm appearance-none transition-all duration-300"
              value={filters.active}
              onChange={(e) => handleFilterChange('active', e.target.value)}
            >
              <option value="">{t('All Status')}</option>
              <option value="true">{t('Active')}</option>
              <option value="false">{t('Inactive')}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Enhanced Rates Table */}
      <div className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-slate-50 to-gray-50/80 border-b border-gray-100">
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  {t('Currency')}
                </th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  {t('Buy Rate')}
                </th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  {t('Sell Rate')}
                </th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  {t('Middle')}
                </th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  {t('Date')}
                </th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  {t('Status')}
                </th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  {t('Actions')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan="7" className="px-8 py-12 text-center">
                    <div className="flex justify-center items-center">
                      <PulseLoader size={12} color="#3B82F6" />
                      <span className="ml-3 text-gray-600">
                        {t('Loading rates...')}
                      </span>
                    </div>
                  </td>
                </tr>
              ) : rates.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-8 py-16 text-center">
                    <div className="text-gray-400">
                      <BsSearch className="text-4xl mx-auto mb-3" />
                      <div className="text-lg font-medium">
                        {t('No rates found')}
                      </div>
                      <p className="text-sm mt-1">
                        {t('Try adjusting your search filters')}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                rates.map((rate) => (
                  <tr
                    key={rate.id}
                    className="hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-purple-50/20 transition-all duration-300 group"
                  >
                    <td className="px-4 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                          {rate.sourceCurrency?.typeName?.substring(0, 2)}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 group-hover:text-blue-900 transition-colors">
                            {rate.sourceCurrency?.typeName} →{' '}
                            {rate.targetCurrency?.typeName}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            ID: {rate.fromCurrency} → {rate.toCurrency}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-5">
                      <div className="text-sm font-mono text-gray-900 bg-green-50 px-3 py-1 rounded-lg border border-green-100">
                        {parseFloat(rate.buyRate).toFixed(6)}
                      </div>
                    </td>
                    <td className="px-4 py-5">
                      <div className="text-sm font-mono text-gray-900 bg-red-50 px-3 py-1 rounded-lg border border-red-100">
                        {parseFloat(rate.sellRate).toFixed(6)}
                      </div>
                    </td>
                    <td className="px-4 py-5">
                      <div className="text-sm font-mono font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent px-3 py-1 rounded-lg border border-blue-100">
                        {parseFloat(rate.middleRate).toFixed(6)}
                      </div>
                    </td>
                    <td className="px-4 py-5">
                      <div className="text-sm text-gray-700 bg-gray-50 px-3 py-1 rounded-lg border border-gray-100">
                        {new Date(rate.effectiveDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-4 py-5">
                      <span
                        className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                          rate.isActive
                            ? 'bg-green-100 text-green-800 border border-green-200 shadow-sm'
                            : 'bg-red-100 text-red-800 border border-red-200 shadow-sm'
                        }`}
                      >
                        {rate.isActive ? (
                          <>
                            <BsCheckCircle className="mr-1.5" />
                            {t('Active')}
                          </>
                        ) : (
                          <>
                            <BsXCircle className="mr-1.5" />
                            {t('Inactive')}
                          </>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex gap-2">
                        <button
                          onClick={() => onViewRate(rate)}
                          className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-xl transition-all duration-300 group/view"
                          title={t('View')}
                        >
                          <BsEye className="group-hover/view:scale-110 transition-transform" />
                        </button>
                        <button
                          onClick={() => onEditRate(rate)}
                          className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-xl transition-all duration-300 group/edit"
                          title={t('Edit')}
                        >
                          <BsPencil className="group-hover/edit:scale-110 transition-transform" />
                        </button>
                        <button
                          onClick={() => handleDelete(rate.id)}
                          disabled={deleteRateMutation.isLoading}
                          className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-xl transition-all duration-300 group/delete disabled:opacity-50"
                          title={t('Deactivate')}
                        >
                          <BsTrash className="group-hover/delete:scale-110 transition-transform" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Enhanced Pagination */}
        {totalPages > 1 && (
          <div className="px-8 py-6 border-t border-gray-100 bg-gradient-to-r from-slate-50 to-gray-50/50">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-600">
                {t('Showing')}{' '}
                <span className="font-semibold">{(page - 1) * 50 + 1}</span>{' '}
                {t('to')}{' '}
                <span className="font-semibold">
                  {Math.min(page * 50, total)}
                </span>{' '}
                {t('of')} <span className="font-semibold">{total}</span>{' '}
                {t('results')}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-white disabled:opacity-50 transition-all duration-300 hover:shadow-sm"
                >
                  {t('Previous')}
                </button>
                <div className="flex gap-1">
                  {[...Array(Math.min(5, totalPages))].map((_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`w-10 h-10 rounded-xl transition-all duration-300 ${
                          page === pageNum
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                            : 'border border-gray-300 hover:bg-white hover:shadow-sm'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-white disabled:opacity-50 transition-all duration-300 hover:shadow-sm"
                >
                  {t('Next')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RateList;
