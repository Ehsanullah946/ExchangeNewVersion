import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  BsX,
  BsCheckCircle,
  BsXCircle,
  BsCalendar,
  BsCurrencyExchange,
  BsArrowLeftRight,
} from 'react-icons/bs';
import { useDateFormatter } from '../../hooks/useDateFormatter';

const RateDetails = ({ rate, onClose }) => {
  const { t } = useTranslation();

  const { displayDate } = useDateFormatter();

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-500000 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col transform transition-all duration-300 scale-100">
        {/* Enhanced Header - Fixed */}
        <div className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-3xl flex-shrink-0">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <BsCurrencyExchange className="text-white text-xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {t('Rate Details')}
                </h2>
                <p className="text-blue-100 text-sm mt-1">
                  {t('Complete exchange rate information')}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <BsX className="text-white text-lg" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-8 space-y-8">
            {/* Currency Pair */}
            <div className="text-center">
              <div className="inline-flex items-center gap-4 bg-gradient-to-r from-slate-50 to-blue-50/50 rounded-2xl px-8 py-6 border border-gray-100">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg mb-2 shadow-lg">
                    {rate.sourceCurrency?.typeName?.substring(0, 2)}
                  </div>
                  <div className="font-bold text-gray-900">
                    {rate.sourceCurrency?.typeName}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {t('ID')}: {rate.fromCurrency}
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <BsArrowLeftRight className="text-blue-500 text-2xl mx-4" />
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg mb-2 shadow-lg">
                    {rate.targetCurrency?.typeName?.substring(0, 2)}
                  </div>
                  <div className="font-bold text-gray-900">
                    {rate.targetCurrency?.typeName}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {t('ID')}: {rate.toCurrency}
                  </div>
                </div>
              </div>
            </div>

            {/* Rates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl border border-blue-200 text-center group hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  <span className="font-bold">B</span>
                </div>
                <h3 className="text-sm font-semibold text-blue-800 mb-2">
                  {t('Buy Rate')}
                </h3>
                <p className="text-2xl font-bold text-blue-900 font-mono">
                  {parseFloat(rate.buyRate).toFixed(6)}
                </p>
              </div>

              <div className="p-6 bg-gradient-to-br from-green-50 to-green-100/50 rounded-2xl border border-green-200 text-center group hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  <span className="font-bold">S</span>
                </div>
                <h3 className="text-sm font-semibold text-green-800 mb-2">
                  {t('Sell Rate')}
                </h3>
                <p className="text-2xl font-bold text-green-900 font-mono">
                  {parseFloat(rate.sellRate).toFixed(6)}
                </p>
              </div>

              <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl border border-purple-200 text-center group hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  <span className="font-bold">M</span>
                </div>
                <h3 className="text-sm font-semibold text-purple-800 mb-2">
                  {t('Middle Rate')}
                </h3>
                <p className="text-2xl font-bold text-purple-900 font-mono">
                  {parseFloat(rate.middleRate).toFixed(6)}
                </p>
              </div>
            </div>

            {/* Additional Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200">
                <h3 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
                  <BsCalendar className="text-blue-500" />
                  {t('Effective Date')}
                </h3>
                <p className="text-lg font-semibold text-gray-900">
                  {new Date(rate.effectiveDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>

              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200">
                <h3 className="text-sm font-medium text-gray-500 mb-3">
                  {t('Status')}
                </h3>
                <span
                  className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold ${
                    rate.isActive
                      ? 'bg-green-100 text-green-800 border border-green-200'
                      : 'bg-red-100 text-red-800 border border-red-200'
                  }`}
                >
                  {rate.isActive ? (
                    <>
                      <BsCheckCircle className="mr-2" />
                      {t('Active')}
                    </>
                  ) : (
                    <>
                      <BsXCircle className="mr-2" />
                      {t('Inactive')}
                    </>
                  )}
                </span>
              </div>
            </div>

            {/* Created Information */}
            {rate.creator && (
              <div className="p-6 bg-gradient-to-r from-slate-50 to-blue-50/30 rounded-2xl border border-gray-200">
                <h3 className="text-sm font-medium text-gray-500 mb-4">
                  {t('Created Information')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-gray-600 text-sm">
                      {t('Created By')}:
                    </span>
                    <p className="text-gray-900 font-medium">
                      {rate.creator.firstName} {rate.creator.lastName}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">
                      {t('Created At')}:
                    </span>
                    <p className="text-gray-900 font-medium">
                      {displayDate(rate.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer - Fixed */}
        <div className="px-8 py-4 border-t border-gray-200 bg-gray-50 rounded-b-3xl flex-shrink-0">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:shadow-sm transition-all duration-300 font-semibold"
            >
              {t('Close Details')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateDetails;
