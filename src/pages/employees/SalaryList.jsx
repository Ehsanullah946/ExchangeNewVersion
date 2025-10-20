// components/salary/SalaryList.jsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BsSearch,
  BsFilter,
  BsThreeDotsVertical,
  BsCheckCircle,
  BsClock,
  BsXCircle,
} from 'react-icons/bs';
import { useSalaries } from '../../hooks/useSalaryQueries';
import { formatNumber } from '../../utils/formatNumber';
import { useDateFormatter } from '../../hooks/useDateFormatter';

const SalaryList = () => {
  const { t } = useTranslation();
  const { formatDisplay } = useDateFormatter();
  const [filters, setFilters] = useState({
    search: '',
    paymentStatus: '',
    moneyTypeId: '',
  });
  const [showFilters, setShowFilters] = useState(false);

  const { data: salariesData, isLoading } = useSalaries(filters);
  const salaries = salariesData?.data || [];

  const getStatusBadge = (status) => {
    const statusConfig = {
      paid: {
        color: 'text-green-800 bg-green-100 border-green-200',
        icon: BsCheckCircle,
      },
      pending: {
        color: 'text-orange-800 bg-orange-100 border-orange-200',
        icon: BsClock,
      },
      cancelled: {
        color: 'text-red-800 bg-red-100 border-red-200',
        icon: BsXCircle,
      },
    };

    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <span
        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold border ${config.color}`}
      >
        <Icon className="text-sm" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-gray-50 rounded-2xl p-4">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 w-full lg:max-w-md">
            <BsSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search employees..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Filter Toggle */}
          <div className="flex gap-3 w-full lg:w-auto">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <BsFilter />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Status
              </label>
              <select
                value={filters.paymentStatus}
                onChange={(e) =>
                  handleFilterChange('paymentStatus', e.target.value)
                }
                className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Statuses</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Currency
              </label>
              <select
                value={filters.moneyTypeId}
                onChange={(e) =>
                  handleFilterChange('moneyTypeId', e.target.value)
                }
                className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Currencies</option>
                {/* This would be populated from moneyTypes data */}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Salary List */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                  Salary Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                  Gross Salary
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                  Net Salary
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {salaries.map((salary) => (
                <tr
                  key={salary.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {salary.employee?.stakeholder?.person?.firstName?.charAt(
                          0
                        )}
                        {salary.employee?.stakeholder?.person?.lastName?.charAt(
                          0
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {salary.employee?.stakeholder?.person?.firstName}{' '}
                          {salary.employee?.stakeholder?.person?.lastName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {salary.employee?.position}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDisplay(salary.salaryDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">
                        ${formatNumber(salary.grossSalary)}
                      </span>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {salary.moneyType?.typeName}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-green-600">
                      ${formatNumber(salary.netSalary)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(salary.paymentStatus)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                      <BsThreeDotsVertical className="text-lg" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {salaries.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BsCashCoin className="text-2xl text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                No salaries found
              </h3>
              <p className="text-gray-500">
                {filters.search || filters.paymentStatus || filters.moneyTypeId
                  ? 'Try adjusting your filters'
                  : 'No salary records have been created yet'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalaryList;
