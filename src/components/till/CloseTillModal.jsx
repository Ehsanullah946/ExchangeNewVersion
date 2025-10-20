// components/till/CloseTillModal.jsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BsX,
  BsCalculator,
  BsCheckCircle,
  BsCurrencyExchange,
} from 'react-icons/bs';
import { formatNumber } from '../../utils/formatNumber';

const CloseTillModal = ({
  isOpen,
  onClose,
  onCloseTill,
  loading,
  todayTill,
  moneyTypeId = null,
  currencyName = '',
}) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    actualCash: '',
    notes: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const closeData = {
        ...formData,
        ...(moneyTypeId && { moneyTypeId }), // Include moneyTypeId if provided
      };
      await onCloseTill(closeData);
      onClose();
      setFormData({ actualCash: '', notes: '' });
    } catch (error) {
      // Error handled in hook
    }
  };

  const handleClose = () => {
    onClose();
    setFormData({ actualCash: '', notes: '' });
  };

  if (!isOpen) return null;

  // Handle both single till and multi-currency till structures
  const expectedCash =
    todayTill?.closingBalance || todayTill?.till?.closingBalance || 0;
  const difference = formData.actualCash
    ? parseFloat(formData.actualCash) - parseFloat(expectedCash)
    : 0;

  const getCurrencyDisplayName = () => {
    if (currencyName) return currencyName;
    if (todayTill?.moneyType?.typeName) return todayTill.moneyType.typeName;
    return 'Currency';
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-1 z-50">
      <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl border border-gray-200/60 transform transition-all duration-300 scale-100">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
              <BsCalculator className="text-2xl text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {t('Close Till')}
              </h2>
              {moneyTypeId && (
                <div className="flex items-center gap-2 mt-1">
                  <BsCurrencyExchange className="text-gray-500 text-sm" />
                  <span className="text-sm text-gray-600 font-medium">
                    {getCurrencyDisplayName()}
                  </span>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
          >
            <BsX className="text-2xl text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-1">
          {/* Currency Info (for multi-currency) */}
          {moneyTypeId && (
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-2 border border-blue-200 mb-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500 rounded-xl text-white">
                  <BsCurrencyExchange className="text-lg" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-800 text-sm">
                    {getCurrencyDisplayName()} {t('Till')}
                  </h3>
                  <p className="text-xs text-blue-600">
                    {t("Closing this currency's till for today")}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Expected Cash */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              {t('Expected Cash')} {t('(Closing Balance)')}
            </label>
            <div className="relative">
              <input
                type="text"
                value={`$${formatNumber(expectedCash).toLocaleString(
                  undefined,
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                )}`}
                disabled
                className="w-full border-2 border-gray-200 rounded-2xl px-4 py-1 bg-gray-50/80 text-gray-600 font-semibold text-lg"
              />
            </div>
          </div>

          {/* Actual Cash Counted */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              {t('Actual Cash Counted')} *
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold text-md">
                $
              </span>
              <input
                type="number"
                step="0.01"
                min="0"
                required
                value={formData.actualCash}
                onChange={(e) => {
                  const value = e.target.value;
                  // Allow empty string or valid numbers
                  if (
                    value === '' ||
                    (!isNaN(value) && parseFloat(value) >= 0)
                  ) {
                    setFormData((prev) => ({
                      ...prev,
                      actualCash: value,
                    }));
                  }
                }}
                onBlur={(e) => {
                  // Format to 2 decimal places on blur
                  if (e.target.value && !isNaN(e.target.value)) {
                    setFormData((prev) => ({
                      ...prev,
                      actualCash: parseFloat(e.target.value).toFixed(2),
                    }));
                  }
                }}
                className="w-full border-2 border-gray-200 rounded-2xl px-12 py-1 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 font-semibold text-lg"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Difference Display */}
          {formData.actualCash && !isNaN(formData.actualCash) && (
            <div
              className={`p-3 rounded-2xl border-2 transition-all duration-300 ${
                difference === 0
                  ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 text-green-800'
                  : difference > 0
                  ? 'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200 text-blue-800'
                  : 'bg-gradient-to-r from-red-50 to-rose-50 border-red-200 text-red-800'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">{'Difference'}:</span>
                <span className="font-bold text-xl">
                  {difference > 0 ? '+' : ''}$
                  {Math.abs(difference).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2 font-semibold">
                {difference === 0 ? (
                  <>
                    <BsCheckCircle className="text-green-600" />
                    Perfect match!
                  </>
                ) : difference > 0 ? (
                  <>
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Overage (Extra cash)
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    Shortage (Missing cash)
                  </>
                )}
              </div>
              {difference !== 0 && (
                <p className="text-xs mt-1 opacity-80">
                  {difference > 0
                    ? 'You have more cash than expected. Please verify your count.'
                    : 'You have less cash than expected.'}
                </p>
              )}
            </div>
          )}

          {/* Notes */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t('Notes')} {t('(Optional)')}
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, notes: e.target.value }))
              }
              rows="2"
              className="w-full border-2 border-gray-200 rounded-2xl px-4 py-2 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 resize-none"
              placeholder={
                moneyTypeId
                  ? `${`Notes for ${getCurrencyDisplayName()} till closing...`}`
                  : "Any notes about today's cash count..."
              }
            />
          </div>

          {/* Warning for non-zero difference */}
          {/* {Math.abs(difference) > 0.01 && (
            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-2xl p-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="font-semibold text-yellow-800 text-sm">
                  Difference Detected
                </span>
              </div>
              <p className="text-xs text-yellow-700 mt-1">
                The actual cash count doesn't match the expected amount.
              </p>
            </div>
          )} */}

          {/* Actions */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="flex-1 px-6 py-1 border-2 border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 transition-all duration-300 hover:shadow-lg disabled:opacity-50 font-semibold"
            >
              {t('Cancel')}
            </button>
            <button
              type="submit"
              disabled={
                loading || !formData.actualCash || isNaN(formData.actualCash)
              }
              className="flex-1 px-6 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 font-semibold shadow-lg flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {t('Closing...')}
                </>
              ) : (
                <>
                  <BsCheckCircle className="text-md" />
                  {t('Close Till')}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CloseTillModal;
