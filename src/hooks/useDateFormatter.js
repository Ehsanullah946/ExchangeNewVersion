// hooks/useDateFormatter.js
import { useState, useEffect } from 'react';
import { dateService } from '../utils/dateService';

export const useDateFormatter = () => {
  const [currentCalendar, setCurrentCalendar] = useState(
    dateService.getCurrentCalendar()
  );

  useEffect(() => {
    const handleCalendarChange = () => {
      console.log('Calendar changed to:', dateService.getCurrentCalendar());
      setCurrentCalendar(dateService.getCurrentCalendar());
    };

    window.addEventListener('calendarChanged', handleCalendarChange);
    return () =>
      window.removeEventListener('calendarChanged', handleCalendarChange);
  }, []);

  const formatDisplay = (date, options = {}) => {
    return dateService.formatDisplay(date, options);
  };

  const formatInput = (date) => {
    return dateService.formatInput(date);
  };

  const parseInput = (inputValue) => {
    return dateService.parseInput(inputValue);
  };

  const validateDate = (dateValue) => {
    return dateService.validateDate(dateValue);
  };

  const isValidPersianDate = (dateString) => {
    return dateService.isValidPersianDate(dateString);
  };

  const setCalendar = (calendarType) => {
    console.log('Setting calendar to:', calendarType);
    dateService.setCalendar(calendarType);
    setCurrentCalendar(calendarType);
    window.dispatchEvent(new Event('calendarChanged'));
  };

  return {
    currentCalendar,
    formatDisplay,
    formatInput,
    parseInput,
    validateDate,
    isValidPersianDate,
    setCalendar,
  };
};
