// components/salary/CreateSalaryModal.jsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BsX, BsCalculator, BsPerson } from 'react-icons/bs';
import { useCreateSalary } from '../../hooks/useSalaryQueries';
import { formatNumber } from '../../utils/formatNumber';

const CreateSalaryModal = ({ isOpen, onClose, employees, moneyTypes }) => {
  const { t } = useTranslation();
  const createSalaryMutation = useCreateSalary();

  const [formData, setFormData] = useState({
    employeeId: '',
    grossSalary: '',
    tax: '0',
    bonus: '0',
    deductions: '0',
    moneyTypeId: '',
    salaryDate: new Date().toISOString().split('T')[0],
    notes: '',
  });

  console.log('Employee Data', employees);

  const [calculatedNet, setCalculatedNet] = useState(0);

  const handleInputChange = (field, value) => {
    const newFormData = {
      ...formData,
      [field]: value,
    };

    setFormData(newFormData);

    // Calculate net salary
    if (['grossSalary', 'tax', 'bonus', 'deductions'].includes(field)) {
      const gross = parseFloat(newFormData.grossSalary) || 0;
      const tax = parseFloat(newFormData.tax) || 0;
      const bonus = parseFloat(newFormData.bonus) || 0;
      const deductions = parseFloat(newFormData.deductions) || 0;

      const net = gross + bonus - tax - deductions;
      setCalculatedNet(net);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createSalaryMutation.mutateAsync({
        employeeId: formData.employeeId,
        salaryData: {
          grossSalary: parseFloat(formData.grossSalary),
          tax: parseFloat(formData.tax),
          bonus: parseFloat(formData.bonus),
          deductions: parseFloat(formData.deductions),
          moneyTypeId: parseInt(formData.moneyTypeId),
          salaryDate: formData.salaryDate,
          notes: formData.notes,
        },
      });

      onClose();
      setFormData({
        employeeId: '',
        grossSalary: '',
        tax: '0',
        bonus: '0',
        deductions: '0',
        moneyTypeId: '',
        salaryDate: new Date().toISOString().split('T')[0],
        notes: '',
      });
      setCalculatedNet(0);
    } catch (error) {
      // Error handled by mutation
    }
  };

  if (!isOpen) return null;

  const selectedEmployee = employees.find(
    (emp) => emp.id == formData.employeeId
  );

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 z-50">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] shadow-2xl border border-gray-200/60 flex flex-col">
        {/* Header - Fixed */}
        <div className="flex-shrink-0 flex justify-between items-center p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
              <BsCalculator className="text-xl text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {t('Create Salary Record')}
              </h2>
              <p className="text-gray-600 text-sm">
                Add salary information for employee
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <BsX className="text-2xl text-gray-500" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            {/* Employee Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Employee *
              </label>
              <select
                required
                value={formData.employeeId}
                onChange={(e) =>
                  handleInputChange('employeeId', e.target.value)
                }
                className="w-full border-2 border-gray-200 rounded-2xl px-4 py-2 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300"
              >
                <option value="">Select Employee</option>
                {employees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee?.Stakeholder?.Person.firstName}{' '}
                    {employee?.Stakeholder?.Person.lastName} -{' '}
                    {employee?.position}
                  </option>
                ))}
              </select>
            </div>

            {selectedEmployee && (
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-2 border border-blue-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500 rounded-xl text-white">
                    <BsPerson className="text-md" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-800">
                      {selectedEmployee?.Stakeholder?.Person.firstName}{' '}
                      {selectedEmployee?.Stakeholder?.Person.lastName}
                    </h3>
                    <p className="text-sm text-blue-600">
                      {selectedEmployee?.position}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Gross Salary */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Gross Salary *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold">
                    $
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.grossSalary}
                    onChange={(e) =>
                      handleInputChange('grossSalary', e.target.value)
                    }
                    className="w-full border-2 border-gray-200 rounded-2xl pl-12 pr-4 py-2 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Currency */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Currency *
                </label>
                <select
                  required
                  value={formData.moneyTypeId}
                  onChange={(e) =>
                    handleInputChange('moneyTypeId', e.target.value)
                  }
                  className="w-full border-2 border-gray-200 rounded-2xl px-4 py-2 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300"
                >
                  <option value="">Select Currency</option>
                  {moneyTypes.map((moneyType) => (
                    <option key={moneyType.id} value={moneyType.id}>
                      {moneyType.typeName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Tax */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tax
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold">
                    $
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.tax}
                    onChange={(e) => handleInputChange('tax', e.target.value)}
                    className="w-full border-2 border-gray-200 rounded-2xl pl-12 pr-4 py-2 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Bonus */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Bonus
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold">
                    $
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.bonus}
                    onChange={(e) => handleInputChange('bonus', e.target.value)}
                    className="w-full border-2 border-gray-200 rounded-2xl pl-12 pr-4 py-2 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Deductions */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Deductions
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold">
                    $
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.deductions}
                    onChange={(e) =>
                      handleInputChange('deductions', e.target.value)
                    }
                    className="w-full border-2 border-gray-200 rounded-2xl pl-12 pr-4 py-2 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>

            {/* Net Salary Display */}
            {formData.grossSalary && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-2 border border-green-200">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-green-800 text-lg">
                    Net Salary:
                  </span>
                  <span className="font-bold text-2xl text-green-800">
                    ${formatNumber(calculatedNet)}
                  </span>
                </div>
                <p className="text-sm text-green-600 mt-2">
                  Calculated: Gross + Bonus - Tax - Deductions
                </p>
              </div>
            )}

            {/* Salary Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Salary Date
              </label>
              <input
                type="date"
                value={formData.salaryDate}
                onChange={(e) =>
                  handleInputChange('salaryDate', e.target.value)
                }
                className="w-full border-2 border-gray-200 rounded-2xl px-4 py-2 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                rows="3"
                className="w-full border-2 border-gray-200 rounded-2xl px-4 py-2 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 resize-none"
                placeholder="Additional notes about this salary record..."
              />
            </div>
          </form>
        </div>

        {/* Footer with Actions - Fixed */}
        <div className="flex-shrink-0 border-t border-gray-200 p-4">
          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              disabled={createSalaryMutation.isPending}
              className="flex-1 px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 transition-all duration-300 hover:shadow-lg disabled:opacity-50 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={
                createSalaryMutation.isPending ||
                !formData.employeeId ||
                !formData.grossSalary ||
                !formData.moneyTypeId
              }
              className="flex-1 px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 font-semibold shadow-lg flex items-center justify-center gap-2"
              onClick={handleSubmit}
            >
              {createSalaryMutation.isPending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating...
                </>
              ) : (
                'Create Salary Record'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSalaryModal;
