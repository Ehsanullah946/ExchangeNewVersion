import { useState, useEffect } from 'react';
import { dateService } from '../utils/dateService';

export const useDateFormatter = () => {
  const [currentCalendar, setCurrentCalendar] = useState(
    dateService.getCurrentCalendar()
  );

  useEffect(() => {
    const handleCalendarChange = () => {
      setCurrentCalendar(dateService.getCurrentCalendar());
    };

    window.addEventListener('calendarChanged', handleCalendarChange);
    return () =>
      window.removeEventListener('calendarChanged', handleCalendarChange);
  }, []);

  const formatDate = (date, format = 'default') => {
    return dateService.formatDate(date, format);
  };

  const formatForBackend = (date) => {
    return dateService.formatForBackend(date);
  };

  const formatForDisplay = (backendDate) => {
    return dateService.formatForDisplay(backendDate);
  };

  return {
    currentCalendar,
    formatDate,
    formatForBackend,
    formatForDisplay,
    setCalendar: dateService.setCalendar.bind(dateService),
  };
};
