// components/till/CloseTillModal.jsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          {t('Close Till for Today')}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Expected Cash */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expected Cash (Closing Balance)
            </label>
            <input
              type="text"
              value={`$${parseFloat(expectedCash).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`}
              disabled
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-600"
            />
          </div>

          {/* Actual Cash Counted */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Actual Cash Counted *
            </label>
            <input
              type="number"
              step="0.01"
              required
              value={formData.actualCash}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, actualCash: e.target.value }))
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
            />
          </div>

          {/* Difference Display */}
          {formData.actualCash && (
            <div
              className={`p-3 rounded-lg ${
                difference === 0
                  ? 'bg-green-100 text-green-800'
                  : difference > 0
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">Difference:</span>
                <span className="font-bold">
                  {difference > 0 ? '+' : ''}$
                  {Math.abs(difference).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="text-sm mt-1">
                {difference === 0
                  ? 'Perfect match!'
                  : difference > 0
                  ? 'Overage'
                  : 'Shortage'}
              </div>
            </div>
          )}

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, notes: e.target.value }))
              }
              rows="3"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Any notes about today's cash count..."
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !formData.actualCash}
              className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
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
