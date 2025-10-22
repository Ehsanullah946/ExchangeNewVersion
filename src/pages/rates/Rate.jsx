import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import RateDetails from './RateDetails';
import RateForm from './RateForm';
import RateList from './RateList';

const Rate = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('rates');
  const [showForm, setShowForm] = useState(false);
  const [selectedRate, setSelectedRate] = useState(null);
  const [viewRate, setViewRate] = useState(null);

  const handleAddRate = () => {
    setSelectedRate(null);
    setShowForm(true);
  };

  const handleEditRate = (rate) => {
    setSelectedRate(rate);
    setShowForm(true);
  };

  const handleViewRate = (rate) => {
    setViewRate(rate);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setSelectedRate(null);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setSelectedRate(null);
  };

  const handleCloseDetails = () => {
    setViewRate(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="mb-4 text-center">
          <div className="inline-flex items-center justify-center w-15 h-15 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
            {t('Exchange Rates Management')}
          </h1>
          <p className="text-gray-600 mt-3 text-lg max-w-2xl mx-auto leading-relaxed">
            {t(
              'Manage currency rates and perform conversions with real-time financial data'
            )}
          </p>
        </div>

        {/* Enhanced Tabs */}
        <div className="mb-5">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/20">
            <nav className="flex space-x-2">
              {[
                { id: 'rates', name: t('Rates List'), icon: '📊' },
                { id: 'converter', name: t('Currency Converter'), icon: '🔄' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'rates' && (
          <RateList
            onAddRate={handleAddRate}
            onEditRate={handleEditRate}
            onViewRate={handleViewRate}
          />
        )}

        {/* Modals */}
        {showForm && (
          <RateForm
            rate={selectedRate}
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        )}

        {viewRate && (
          <RateDetails rate={viewRate} onClose={handleCloseDetails} />
        )}
      </div>
    </div>
  );
};

export default Rate;
