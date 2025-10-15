// utils/dateService.js
import moment from 'moment-jalaali';

export class DateService {
  constructor() {
    this.currentCalendar =
      localStorage.getItem('preferredCalendar') || 'gregorian';
  }

  setCalendar(calendarType) {
    this.currentCalendar = calendarType;
    localStorage.setItem('preferredCalendar', calendarType);
  }

  getCurrentCalendar() {
    return this.currentCalendar;
  }

  // Convert Gregorian to Persian
  gregorianToPersian(gregorianDate) {
    if (!gregorianDate) return '';

    try {
      return moment(gregorianDate).format('jYYYY/jMM/jDD');
    } catch (error) {
      console.error('Error converting to Persian date:', error);
      return gregorianDate;
    }
  }

  // Convert Persian to Gregorian
  persianToGregorian(persianDateStr) {
    if (!persianDateStr) return '';

    try {
      return moment(persianDateStr, 'jYYYY/jMM/jDD').format('YYYY-MM-DD');
    } catch (error) {
      console.error('Error converting to Gregorian date:', error);
      return persianDateStr;
    }
  }

  // Format date based on current calendar
  formatDate(date, format = 'default') {
    if (!date) return '';

    if (this.currentCalendar === 'persian') {
      return this.formatPersianDate(date, format);
    } else {
      return this.formatGregorianDate(date, format);
    }
  }

  formatGregorianDate(date, format = 'default') {
    const dateObj = new Date(date);

    if (format === 'short') {
      return dateObj.toLocaleDateString('en-US');
    } else if (format === 'time') {
      return dateObj.toLocaleTimeString('en-US');
    } else if (format === 'datetime') {
      return dateObj.toLocaleString('en-US');
    } else if (format === 'input') {
      return dateObj.toISOString().split('T')[0]; // YYYY-MM-DD for input
    } else {
      return dateObj.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
    }
  }

  formatPersianDate(date, format = 'default') {
    try {
      if (format === 'short') {
        return moment(date).format('jYYYY/jMM/jDD');
      } else if (format === 'time') {
        return moment(date).format('HH:mm:ss');
      } else if (format === 'datetime') {
        return moment(date).format('jYYYY/jMM/jDD HH:mm:ss');
      } else if (format === 'input') {
        return moment(date).format('jYYYY/jMM/jDD'); // For Persian input
      } else {
        return moment(date).format('jYYYY/jMM/jDD HH:mm:ss');
      }
    } catch (error) {
      console.error('Error formatting Persian date:', error);
      return this.formatGregorianDate(date, format);
    }
  }

  // Check if string is valid Persian date
  isValidPersianDate(dateString) {
    return moment(dateString, 'jYYYY/jMM/jDD', true).isValid();
  }

  // Get today's date in current calendar format
  getToday() {
    const today = new Date();
    if (this.currentCalendar === 'persian') {
      return moment(today).format('jYYYY/jMM/jDD');
    } else {
      return today.toISOString().split('T')[0];
    }
  }
}

export const dateService = new DateService();
