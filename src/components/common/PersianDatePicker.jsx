// components/PersianDatePicker.jsx
import React, { useState } from 'react';
import DatePicker from 'react-datepicker2';
import { useDateFormatter } from '../../hooks/useDateFormatter';
import { useTranslation } from 'react-i18next';
import moment from 'moment-jalaali';

const PersianDatePicker = ({ value, onChange, name, required = false }) => {
  const { t } = useTranslation();
  const { formatForBackend, formatForDisplay } = useDateFormatter();
  const [selectedDate, setSelectedDate] = useState(null);

  React.useEffect(() => {
    if (value) {
      try {
        const momentDate = moment(value);
        setSelectedDate(momentDate);
      } catch (error) {
        console.error('Error parsing date:', error);
      }
    } else {
      setSelectedDate(null);
    }
  }, [value]);

  const handleDateChange = (momentDate) => {
    setSelectedDate(momentDate);

    if (momentDate) {
      const gregorianDate = momentDate.format('YYYY-MM-DD');
      onChange({ target: { name, value: gregorianDate } });
    } else {
      onChange({ target: { name, value: '' } });
    }
  };

  return (
    <div className="persian-date-picker">
      <DatePicker
        value={selectedDate}
        onChange={handleDateChange}
        isGregorian={false} // Use Persian calendar
        timePicker={false}
        inputFormat="jYYYY/jMM/jDD"
        inputJalaaliFormat="jYYYY/jMM/jDD"
        placeholder={t('selectDate')}
        className="w-full border border-gray-300 rounded-lg px-3 py-2"
        required={required}
      />
    </div>
  );
};

export default PersianDatePicker;
