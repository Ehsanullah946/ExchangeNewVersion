// utils/dateService.js
import moment from 'moment-jalaali';
// import moment from 'dayjs';
// // import jalali from 'dayjs/plugin/jalali';
// import 'dayjs/locale/fa';

const afghanMonths = [
  'حمل',
  'ثور',
  'جوزا',
  'سرطان',
  'اسد',
  'سنبله',
  'میزان',
  'عقرب',
  'قوس',
  'جدی',
  'دلو',
  'حوت',
];
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

  // Convert Gregorian to Persian for display
  toPersian(gregorianDate) {
    if (!gregorianDate) return '';
    try {
      // Handle both Date objects and strings
      const date = moment(gregorianDate);
      return date.format('jYYYY/jMM/jDD');
    } catch (error) {
      console.error('Error converting to Persian:', error, gregorianDate);
      return gregorianDate;
    }
  }

  // Convert Persian to Gregorian for backend
  toGregorian(persianDateStr) {
    if (!persianDateStr) return '';
    try {
      // Parse Persian date and convert to Gregorian
      const persianDate = moment(persianDateStr, 'jYYYY/jMM/jDD');
      if (!persianDate.isValid()) {
        throw new Error('Invalid Persian date');
      }
      return persianDate.format('YYYY-MM-DD');
    } catch (error) {
      console.error('Error converting to Gregorian:', error, persianDateStr);
      return '';
    }
  }

  // Format date for display
  formatDisplay(date, options = {}) {
    if (!date) return '';

    const { showTime = false } = options;

    if (this.currentCalendar === 'persian') {
      return this.formatPersianDate(date, showTime);
    } else {
      return this.formatGregorianDate(date, showTime);
    }
  }

  formatGregorianDate(date, showTime = false) {
    try {
      const dateObj = moment(date);
      if (showTime) {
        // Change from 24-hour to 12-hour format
        return dateObj.format('YYYY-MM-DD hh:mm:ss A'); // hh for 12-hour, A for AM/PM
      } else {
        return dateObj.format('YYYY-MM-DD');
      }
    } catch (error) {
      console.error('Error formatting Gregorian date:', error);
      return date;
    }
  }

  formatPersianDate(date, showTime = false) {
    try {
      const dateObj = moment(date);
      const year = dateObj.jYear();
      const month = afghanMonths[dateObj.jMonth()];
      const day = dateObj.jDate();

      if (showTime) {
        // Persian date with 12-hour time
        const time12Hour = dateObj.format('hh:mm:ss A');
        return `${day} ${month} ${year} ${time12Hour}`;
      } else {
        return `${day} ${month} ${year}`;
      }
    } catch (error) {
      console.error('Error formatting Afghan date:', error);
      return this.formatGregorianDate(date, showTime);
    }
  }
  // Format for input field (always returns string in current calendar format)
  formatInput(date) {
    if (!date) return '';

    try {
      if (this.currentCalendar === 'persian') {
        return this.toPersian(date);
      } else {
        // For Gregorian input (HTML date input expects YYYY-MM-DD)
        const dateObj = moment(date);
        return dateObj.format('YYYY-MM-DD hh:mm:ss A');
      }
    } catch (error) {
      console.error('Error formatting input:', error);
      return '';
    }
  }

  // Parse input value to Gregorian for backend
  parseInput(inputValue) {
    if (!inputValue) return '';

    try {
      if (this.currentCalendar === 'persian') {
        return this.toGregorian(inputValue);
      } else {
        // Already in Gregorian, ensure proper format
        const dateObj = moment(inputValue);
        return dateObj.format('YYYY-MM-DD');
      }
    } catch (error) {
      console.error('Error parsing input:', error);
      return '';
    }
  }

  // Check if Persian date is valid
  isValidPersianDate(dateString) {
    return moment(dateString, 'jYYYY/jMM/jDD', true).isValid();
  }

  // Check if Gregorian date is valid
  isValidGregorianDate(dateString) {
    return moment(dateString, 'YYYY-MM-DD', true).isValid();
  }

  // Get today's date in current calendar format
  getToday() {
    const today = moment();
    if (this.currentCalendar === 'persian') {
      return today.format('jYYYY/jMM/jDD');
    } else {
      return today.format('YYYY-MM-DD');
    }
  }

  // Validate date with business rules
  validateDate(dateValue, calendarType = null) {
    if (!dateValue) return { isValid: false, error: 'Date is required' };

    const calendar = calendarType || this.currentCalendar;
    let gregorianDate;

    try {
      if (calendar === 'persian') {
        if (!this.isValidPersianDate(dateValue)) {
          return { isValid: false, error: 'Invalid Persian date format' };
        }
        gregorianDate = moment(dateValue, 'jYYYY/jMM/jDD');
      } else {
        if (!this.isValidGregorianDate(dateValue)) {
          return { isValid: false, error: 'Invalid Gregorian date format' };
        }
        gregorianDate = moment(dateValue, 'YYYY-MM-DD');
      }

      const today = moment().startOf('day');
      const selectedDate = gregorianDate.startOf('day');
      const oneYearAgo = moment().subtract(1, 'year').startOf('day');

      if (selectedDate.isAfter(today)) {
        return { isValid: false, error: 'Future dates are not allowed' };
      }

      if (selectedDate.isBefore(oneYearAgo)) {
        return {
          isValid: false,
          error: 'Date is too old (max 1 year in past)',
        };
      }

      return { isValid: true, error: '' };
    } catch (error) {
      return { isValid: false, error: 'Invalid date' };
    }
  }
}

export const dateService = new DateService();
