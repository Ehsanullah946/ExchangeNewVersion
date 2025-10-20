// pages/salary/SalaryDashboard.jsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BsCashCoin,
  BsPeople,
  BsGraphUp,
  BsPlus,
  BsCurrencyExchange,
} from 'react-icons/bs';
import SalarySummary from '../../components/salary/SalarySummary';
import SalaryList from '../../components/salary/SalaryList';
import CreateSalaryModal from '../../components/salary/CreateSalaryModal';
import {
  useSalarySummary,
  useEmployeesForSalary,
} from '../../hooks/useSalaryQueries';
import { formatNumber } from '../../utils/formatNumber';

const SalaryDashboard = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('overview');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { data: summaryData, isLoading: summaryLoading } = useSalarySummary();
  const { data: employeesData, isLoading: employeesLoading } =
    useEmployeesForSalary();

  const summary = summaryData?.data || {};
  const employees = employeesData?.data?.employees || [];
  const moneyTypes = employeesData?.data?.moneyTypes || [];

  console.log(employees);

  const stats = [
    {
      title: 'Total Employees',
      value: employees.length,
      icon: <BsPeople className="text-2xl text-blue-600" />,
      color: 'bg-blue-50 border-blue-200',
      change: '+12%',
      changeType: 'positive',
    },
    {
      title: 'Monthly Salary Cost',
      value: `$${formatNumber(summary.totalNet || 0)}`,
      icon: <BsCashCoin className="text-2xl text-green-600" />,
      color: 'bg-green-50 border-green-200',
      change: '+5%',
      changeType: 'positive',
    },
    {
      title: 'Pending Payments',
      value: summary.byStatus?.pending || 0,
      icon: <BsGraphUp className="text-2xl text-orange-600" />,
      color: 'bg-orange-50 border-orange-200',
      change: '-2%',
      changeType: 'negative',
    },
    {
      title: 'Currency Types',
      value: Object.keys(summary.byMoneyType || {}).length,
      icon: <BsCurrencyExchange className="text-2xl text-purple-600" />,
      color: 'bg-purple-50 border-purple-200',
      change: '+1',
      changeType: 'positive',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white rounded-2xl shadow-lg border border-blue-100">
                <BsCashCoin className="text-2xl text-blue-600" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
                  {t('Salary Management')}
                </h1>
                <p className="text-gray-600 mt-2 text-lg">
                  Manage employee salaries and payments
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
            >
              <BsPlus className="text-lg" />
              <span className="font-semibold">{t('Add Salary')}</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`bg-white rounded-3xl p-6 shadow-xl border-2 ${stat.color} transition-all duration-300 hover:shadow-2xl hover:-translate-y-2`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <div
                    className={`flex items-center gap-1 mt-2 text-sm ${
                      stat.changeType === 'positive'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    <span>{stat.change}</span>
                    <span>from last month</span>
                  </div>
                </div>
                <div className="p-3 rounded-2xl bg-white shadow-lg">
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200/60 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', name: 'Overview', icon: BsGraphUp },
                { id: 'salaries', name: 'All Salaries', icon: BsCashCoin },
                { id: 'reports', name: 'Reports', icon: BsPeople },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="text-lg" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && <SalarySummary summary={summary} />}
            {activeTab === 'salaries' && <SalaryList />}
            {activeTab === 'reports' && (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BsGraphUp className="text-3xl text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-600 mb-2">
                  Reports Coming Soon
                </h3>
                <p className="text-gray-500">
                  Detailed salary reports and analytics will be available here.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Create Salary Modal */}
        <CreateSalaryModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          employees={employees}
          moneyTypes={moneyTypes}
        />
      </div>
    </div>
  );
};

export default SalaryDashboard;
