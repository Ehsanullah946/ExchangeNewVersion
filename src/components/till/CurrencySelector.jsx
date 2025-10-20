// components/till/CurrencySelector.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { BsCurrencyExchange } from 'react-icons/bs';

const CurrencySelector = ({
  moneyTypes,
  selectedCurrency,
  onCurrencyChange,
}) => {
  const { t } = useTranslation();
  return (
    <div className="relative">
      <select
        value={selectedCurrency}
        onChange={(e) => onCurrencyChange(e.target.value)}
        className="appearance-none bg-white border border-gray-300 rounded-xl px-4 py-2 pr-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="all">{t('All Currencies')}</option>
        {moneyTypes.map((moneyType) => (
          <option key={moneyType.id} value={moneyType.id}>
            {moneyType.typeName}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <BsCurrencyExchange className="text-lg" />
      </div>
    </div>
  );
};

export default CurrencySelector;
