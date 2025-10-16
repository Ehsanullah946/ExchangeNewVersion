// components/DateInput.jsx
import React, { useState, useEffect } from 'react';
import { useDateFormatter } from '../../hooks/useDateFormatter';
import { useTranslation } from 'react-i18next';

const DateInput = ({
  value,
  onChange,
  name,
  required = false,
  disabled = false,
}) => {
  const { t } = useTranslation();
  const {
    currentCalendar,
    formatInput,
    parseInput,
    isValidPersianDate,
    validateDate,
  } = useDateFormatter();

  const [displayValue, setDisplayValue] = useState('');
  const [error, setError] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  // Initialize display value
  useEffect(() => {
    console.log(
      'DateInput - Initializing with value:',
      value,
      'calendar:',
      currentCalendar
    );
    if (value) {
      const formatted = formatInput(value);
      console.log('DateInput - Formatted value:', formatted);
      setDisplayValue(formatted);
    } else {
      setDisplayValue('');
    }
  }, [value, currentCalendar, formatInput]);

  const handleFocus = () => {
    setIsTouched(true);
  };

  const handleBlur = () => {
    setIsTouched(true);

    if (!displayValue) {
      if (required) {
        setError(t('dateRequired'));
      }
      return;
    }

    // Validate the date
    const validation = validateDate(displayValue);
    if (!validation.isValid) {
      setError(validation.error);
      return;
    }

    setError('');

    // Convert to Gregorian for backend
    try {
      const gregorianDate = parseInput(displayValue);
      console.log('DateInput - Converted to Gregorian:', gregorianDate);

      if (gregorianDate) {
        onChange({ target: { name, value: gregorianDate } });
      }
    } catch (error) {
      console.error('DateInput - Conversion error:', error);
      setError(t('dateConversionError'));
    }
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    console.log('DateInput - Raw input:', newValue);
    setDisplayValue(newValue);

    // Clear error when user starts typing
    if (error) {
      setError('');
    }

    // For Gregorian calendar with native date input, update immediately
    if (currentCalendar === 'gregorian' && e.target.type === 'date') {
      const validation = validateDate(newValue);
      if (validation.isValid) {
        onChange({ target: { name, value: newValue } });
      }
    }
  };

  const getPlaceholder = () => {
    return currentCalendar === 'persian' ? '۱۴۰۳/۰۱/۰۱' : 'YYYY-MM-DD';
  };

  const getInputType = () => {
    return currentCalendar === 'persian' ? 'text' : 'date';
  };

  const getInputMode = () => {
    return currentCalendar === 'persian' ? 'numeric' : 'none';
  };

  return (
    <div className="relative">
      <input
        type={getInputType()}
        inputMode={getInputMode()}
        value={displayValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={getPlaceholder()}
        required={required}
        disabled={disabled}
        max={
          currentCalendar === 'gregorian'
            ? new Date().toISOString().split('T')[0]
            : undefined
        }
        className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
          error ? 'border-red-500 bg-red-50' : 'border-gray-300'
        } ${currentCalendar === 'persian' ? 'text-right' : 'text-left'}`}
        dir={currentCalendar === 'persian' ? 'rtl' : 'ltr'}
      />

      {/* Error message */}
      {error && (
        <div className="text-xs text-red-500 mt-1 flex items-center gap-1">
          <svg
            className="w-3 h-3 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          {t(error)}
        </div>
      )}
    </div>
  );
};

export default DateInput;
