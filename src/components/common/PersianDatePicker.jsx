// components/PersianDatePicker.jsx
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useTranslation } from 'react-i18next';
import moment from 'moment-jalaali';
import 'react-datepicker/dist/react-datepicker.css';

// Custom input component to handle Persian display
const CustomInput = React.forwardRef(({ value, onClick, placeholder }, ref) => (
  <input
    type="text"
    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-right"
    onClick={onClick}
    ref={ref}
    value={value}
    placeholder={placeholder}
    readOnly
    dir="rtl"
  />
));

const PersianDatePicker = ({ value, onChange, name, required = false }) => {
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState(null);

  React.useEffect(() => {
    if (value) {
      try {
        const momentDate = moment(value, 'YYYY-MM-DD');
        if (momentDate.isValid()) {
          setSelectedDate(momentDate.toDate());
        }
      } catch (error) {
        console.error('Error parsing date:', error);
      }
    } else {
      setSelectedDate(null);
    }
  }, [value]);

  const handleDateChange = (date) => {
    setSelectedDate(date);

    if (date) {
      try {
        const momentDate = moment(date);
        const gregorianDate = momentDate.format('YYYY-MM-DD');
        const persianDisplay = momentDate.format('jYYYY/jMM/jDD');
        console.log(
          'Date selected - Gregorian:',
          gregorianDate,
          'Persian:',
          persianDisplay
        );
        onChange({ target: { name, value: gregorianDate } });
      } catch (error) {
        console.error('Error converting date:', error);
      }
    } else {
      onChange({ target: { name, value: '' } });
    }
  };

  // Format display value for the input
  const formatDisplayValue = (date) => {
    if (!date) return '';
    try {
      return moment(date).format('jYYYY/jMM/jDD');
    } catch (error) {
      return '';
    }
  };

  return (
    <div className="persian-date-picker" dir="rtl">
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        customInput={
          <CustomInput placeholder={t('selectDate') || 'انتخاب تاریخ'} />
        }
        dateFormat="yyyy/MM/dd"
        showPopperArrow={false}
        placeholderText={t('selectDate') || 'انتخاب تاریخ'}
        required={required}
        popperPlacement="bottom-end"
        renderCustomHeader={({
          date,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className="flex justify-between items-center px-2 py-2">
            <button
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
              type="button"
              className="p-1 rounded hover:bg-gray-100"
            >
              ›
            </button>
            <span className="text-sm font-medium">
              {moment(date).format('jYYYY jMMMM')}
            </span>
            <button
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
              type="button"
              className="p-1 rounded hover:bg-gray-100"
            >
              ‹
            </button>
          </div>
        )}
      />
    </div>
  );
};

export default PersianDatePicker;
