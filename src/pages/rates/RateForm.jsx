// components/RateForm.js - Fixed with Scrollable Modal
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useToast } from '../../hooks/useToast';
import { useMoneyType } from '../../hooks/useMoneyType';
import {
  BsCheckCircle,
  BsXCircle,
  BsCalculator,
  BsCurrencyExchange,
  BsArrowLeftRight,
} from 'react-icons/bs';
import { useCreateRate, useUpdateRate } from '../../hooks/useRate';

const RateForm = ({ rate, onSuccess, onCancel }) => {
  const { t } = useTranslation();
  const toast = useToast();
  const { data: moneyTypes } = useMoneyType();

  const isEdit = !!rate;
  const createMutation = useCreateRate();
  const updateMutation = useUpdateRate();

  const [form, setForm] = useState({
    fromCurrency: '',
    toCurrency: 1,
    buyRate: '',
    sellRate: '',
    effectiveDate: new Date().toISOString().split('T')[0],
    isActive: true,
  });

  useEffect(() => {
    if (rate) {
      setForm({
        fromCurrency: rate.fromCurrency,
        toCurrency: rate.toCurrency,
        buyRate: rate.buyRate,
        sellRate: rate.sellRate,
        effectiveDate: rate.effectiveDate.split('T')[0],
        isActive: rate.isActive,
      });
    }
  }, [rate]);

  const calculateMiddleRate = (buy, sell) => {
    if (buy && sell) {
      return ((parseFloat(buy) + parseFloat(sell)) / 2).toFixed(6);
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => {
      const newForm = {
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      };

      if (name === 'buyRate' || name === 'sellRate') {
        const middleRate = calculateMiddleRate(
          name === 'buyRate' ? value : prev.buyRate,
          name === 'sellRate' ? value : prev.sellRate
        );
        return { ...newForm, middleRate };
      }

      return newForm;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.fromCurrency || !form.buyRate || !form.sellRate) {
      toast.error(t('Please fill all required fields'));
      return;
    }

    const payload = {
      ...form,
      buyRate: parseFloat(form.buyRate),
      sellRate: parseFloat(form.sellRate),
    };

    try {
      if (isEdit) {
        await updateMutation.mutateAsync({ id: rate.id, ...payload });
      } else {
        await createMutation.mutateAsync(payload);
      }
      onSuccess();
    } catch (error) {
      // Error handled by mutation
    }
  };

  const isLoading = createMutation.isLoading || updateMutation.isLoading;
  const middleRate = calculateMiddleRate(form.buyRate, form.sellRate);

  const selectedSourceCurrency = moneyTypes?.data?.find(
    (c) => c.id == form.fromCurrency
  );
  const selectedTargetCurrency = moneyTypes?.data?.find(
    (c) => c.id == form.toCurrency
  );

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-300000 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col transform transition-all duration-300 scale-100">
        {/* Enhanced Header - Fixed */}
        <div className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-3xl flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <BsCurrencyExchange className="text-white text-xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                {isEdit
                  ? t('Edit Exchange Rate')
                  : t('Create New Exchange Rate')}
              </h2>
              <p className="text-blue-100 text-sm mt-1">
                {isEdit
                  ? t('Update existing rate information')
                  : t('Add a new currency exchange rate')}
              </p>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Currency Selection */}
            <div className="bg-gradient-to-r from-slate-50 to-blue-50/30 rounded-2xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <BsArrowLeftRight className="text-blue-500" />
                {t('Currency Pair')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    {t('Source Currency')} *
                  </label>
                  <select
                    name="fromCurrency"
                    value={form.fromCurrency}
                    onChange={handleChange}
                    required
                    disabled={isEdit}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 transition-all duration-300"
                  >
                    <option value="">{t('Select source currency')}</option>
                    {moneyTypes?.data?.map((currency) => (
                      <option key={currency.id} value={currency.id}>
                        {currency.typeName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    {t('Target Currency')}
                  </label>
                  <select
                    name="toCurrency"
                    value={form.toCurrency}
                    onChange={handleChange}
                    disabled={isEdit}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 transition-all duration-300"
                  >
                    {moneyTypes?.data?.map((currency) => (
                      <option key={currency.id} value={currency.id}>
                        {currency.typeName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Currency Preview */}
              {(selectedSourceCurrency || selectedTargetCurrency) && (
                <div className="mt-4 p-4 bg-white/50 rounded-xl border border-gray-200">
                  <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                    {selectedSourceCurrency && (
                      <span className="font-semibold text-gray-900">
                        {selectedSourceCurrency.typeName}
                      </span>
                    )}
                    {selectedSourceCurrency && selectedTargetCurrency && (
                      <BsArrowLeftRight className="text-blue-500" />
                    )}
                    {selectedTargetCurrency && (
                      <span className="font-semibold text-gray-900">
                        {selectedTargetCurrency.typeName}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Rates Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Buy Rate */}
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100/30 rounded-2xl border border-blue-200">
                <label className="block text-sm font-semibold text-blue-800 mb-3">
                  {t('Buy Rate')} *
                </label>
                <input
                  type="number"
                  name="buyRate"
                  value={form.buyRate}
                  onChange={handleChange}
                  step="0.000001"
                  min="0"
                  required
                  className="w-full px-4 py-3 bg-white border border-blue-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-lg transition-all duration-300"
                  placeholder="0.000000"
                />
              </div>

              {/* Sell Rate */}
              <div className="p-4 bg-gradient-to-br from-green-50 to-green-100/30 rounded-2xl border border-green-200">
                <label className="block text-sm font-semibold text-green-800 mb-3">
                  {t('Sell Rate')} *
                </label>
                <input
                  type="number"
                  name="sellRate"
                  value={form.sellRate}
                  onChange={handleChange}
                  step="0.000001"
                  min="0"
                  required
                  className="w-full px-4 py-3 bg-white border border-green-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 font-mono text-lg transition-all duration-300"
                  placeholder="0.000000"
                />
              </div>

              {/* Middle Rate */}
              <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100/30 rounded-2xl border border-purple-200">
                <label className="block text-sm font-semibold text-purple-800 mb-3">
                  {t('Middle Rate')}
                </label>
                <div className="flex items-center gap-3 p-3 bg-white/80 rounded-xl border border-purple-300">
                  <BsCalculator className="text-purple-600 text-xl" />
                  <span className="text-xl font-bold font-mono text-purple-900 flex-1 text-center">
                    {middleRate || '0.000000'}
                  </span>
                </div>
                <p className="text-xs text-purple-600 text-center mt-2">
                  ({t('Auto-calculated')})
                </p>
              </div>
            </div>

            {/* Additional Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  {t('Date')} *
                </label>
                <input
                  type="date"
                  name="effectiveDate"
                  value={form.effectiveDate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                />
              </div>

              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 flex items-center justify-center">
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={form.isActive}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div
                      className={`w-14 h-7 rounded-full transition-all duration-300 ${
                        form.isActive ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    ></div>
                    <div
                      className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-all duration-300 transform ${
                        form.isActive ? 'translate-x-7' : ''
                      }`}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-700">
                    {t('Active Rate')}
                  </span>
                </label>
              </div>
            </div>
          </form>
        </div>

        {/* Action Buttons - Fixed */}
        <div className="px-8 py-4 border-t border-gray-200 bg-gray-50 rounded-b-3xl flex-shrink-0">
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onCancel}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-red-500 rounded-xl hover:bg-gray-200 disabled:opacity-50 transition-all duration-300 font-semibold"
            >
              <BsXCircle />
              {t('Cancel')}
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <BsCheckCircle className="text-lg" />
              )}
              {isEdit ? t('Update Rate') : t('Create Rate')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateForm;
