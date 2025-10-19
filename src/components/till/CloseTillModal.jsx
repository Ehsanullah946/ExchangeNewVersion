// components/till/CloseTillModal.jsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BsX, BsCalculator, BsCheckCircle } from 'react-icons/bs';

const CloseTillModal = ({
  isOpen,
  onClose,
  onCloseTill,
  loading,
  todayTill,
}) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    actualCash: '',
    notes: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onCloseTill(formData);
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

  const expectedCash = todayTill?.closingBalance || 0;
  const difference = formData.actualCash
    ? parseFloat(formData.actualCash) - parseFloat(expectedCash)
    : 0;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl border border-gray-200/60 transform transition-all duration-300 scale-100">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
              <BsCalculator className="text-2xl text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              {t('Close Till for Today')}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
          >
            <BsX className="text-2xl text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Expected Cash */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Expected Cash (Closing Balance)
            </label>
            <div className="relative">
              <input
                type="text"
                value={`$${parseFloat(expectedCash).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`}
                disabled
                className="w-full border-2 border-gray-200 rounded-2xl px-4 py-4 bg-gray-50/80 text-gray-600 font-semibold text-lg"
              />
            </div>
          </div>

          {/* Actual Cash Counted */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Actual Cash Counted *
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold text-lg">
                $
              </span>
              <input
                type="number"
                step="0.01"
                required
                value={formData.actualCash}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    actualCash: e.target.value,
                  }))
                }
                className="w-full border-2 border-gray-200 rounded-2xl px-12 py-4 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 font-semibold text-lg"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Difference Display */}
          {formData.actualCash && (
            <div
              className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                difference === 0
                  ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 text-green-800'
                  : difference > 0
                  ? 'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200 text-blue-800'
                  : 'bg-gradient-to-r from-red-50 to-rose-50 border-red-200 text-red-800'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">Difference:</span>
                <span className="font-bold text-xl">
                  {difference > 0 ? '+' : ''}$
                  {Math.abs(difference).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-2 font-semibold">
                {difference === 0 ? (
                  <>
                    <BsCheckCircle className="text-green-600" />
                    Perfect match!
                  </>
                ) : difference > 0 ? (
                  'Overage'
                ) : (
                  'Shortage'
                )}
              </div>
            </div>
          )}

          {/* Notes */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, notes: e.target.value }))
              }
              rows="3"
              className="w-full border-2 border-gray-200 rounded-2xl px-4 py-4 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 resize-none"
              placeholder="Any notes about today's cash count..."
            />
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 transition-all duration-300 hover:shadow-lg disabled:opacity-50 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !formData.actualCash}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 font-semibold shadow-lg"
            >
              {loading ? 'Closing...' : 'Close Till'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CloseTillModal;
