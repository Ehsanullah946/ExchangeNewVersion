// components/DateInput.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useDateFormatter } from '../../hooks/useDateFormatter';
import { useTranslation } from 'react-i18next';
import { dateService } from '../../utils/dateService';

const DateInput = ({
  value,
  onChange,
  name,
  required = false,
  disabled = false,
}) => {
  const { t } = useTranslation();
  const { currentCalendar, formatForBackend, formatForDisplay } =
    useDateFormatter();
  const [displayValue, setDisplayValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  // Initialize display value
  useEffect(() => {
    if (value) {
      const formatted = formatForDisplay(value);
      setDisplayValue(formatted);
    } else {
      setDisplayValue('');
    }
  }, [value, currentCalendar, formatForDisplay]);

  const handleFocus = () => {
    setIsFocused(true);
    // For Persian calendar, show placeholder in focus
    if (currentCalendar === 'persian' && !displayValue) {
      setDisplayValue('۱۴۰۳/۰۱/۰۱'); // Example format
    }
  };

  const handleBlur = () => {
    setIsFocused(false);

    if (currentCalendar === 'persian') {
      // Validate and convert Persian date
      if (displayValue && dateService.isValidPersianDate(displayValue)) {
        const gregorianDate = dateService.persianToGregorian(displayValue);
        onChange({ target: { name, value: gregorianDate } });
      } else if (
        displayValue &&
        !dateService.isValidPersianDate(displayValue)
      ) {
        // Invalid date, revert to previous value or clear
        setDisplayValue(value ? formatForDisplay(value) : '');
      }
    } else {
      // Gregorian - browser handles validation
      if (displayValue) {
        onChange({ target: { name, value: displayValue } });
      }
    }
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setDisplayValue(newValue);

    // For Gregorian calendar, update immediately
    if (currentCalendar === 'gregorian') {
      onChange({ target: { name, value: newValue } });
    }
  };

  const getPlaceholder = () => {
    if (currentCalendar === 'persian') {
      return '۱۴۰۳/۰۱/۰۱'; // Example: 1403/01/01
    } else {
      return 'YYYY-MM-DD';
    }
  };

  const getInputType = () => {
    return currentCalendar === 'persian' ? 'text' : 'date';
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type={getInputType()}
        value={displayValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={getPlaceholder()}
        required={required}
        disabled={disabled}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        dir={currentCalendar === 'persian' ? 'rtl' : 'ltr'}
      />

      {/* Help text for Persian date format */}
      {currentCalendar === 'persian' && !isFocused && !displayValue && (
        <div className="absolute top-full left-0 mt-1 text-xs text-gray-500">
          {t('persianDateFormat')}
        </div>
      )}

      {/* Validation error */}
      {currentCalendar === 'persian' &&
        displayValue &&
        !dateService.isValidPersianDate(displayValue) && (
          <div className="absolute top-full left-0 mt-1 text-xs text-red-500">
            {t('invalidPersianDate')}
          </div>
        )}
    </div>
  );
};

export default DateInput;
