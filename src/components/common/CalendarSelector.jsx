// components/CalendarSelector.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDateFormatter } from '../../hooks/useDateFormatter';

const CalendarSelector = () => {
  const { t } = useTranslation();
  const { currentCalendar, setCalendar } = useDateFormatter();

  return (
    <div className="flex items-center gap-3 bg-white rounded-lg p-3 shadow border">
      <span className="text-sm font-medium text-gray-700">
        {t('Calendar')}:
      </span>
      <div className="flex bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setCalendar('gregorian')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            currentCalendar === 'gregorian'
              ? 'bg-blue-500 text-white shadow'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          {t('Gregorian')}
        </button>
        <button
          onClick={() => setCalendar('persian')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            currentCalendar === 'persian'
              ? 'bg-green-500 text-white shadow'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          {t('Persian')}
        </button>
      </div>
    </div>
  );
};

export default CalendarSelector;
