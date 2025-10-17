import React, { useState } from 'react';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import { useTranslation } from 'react-i18next';

const afghanDariLocale = {
  name: 'afghan-dari',
  months: [
    ['حمل', 'Hamal'],
    ['ثور', 'Thawr'],
    ['جوزا', 'Jawza'],
    ['سرطان', 'Saratān'],
    ['اسد', 'Asad'],
    ['سنبله', 'Sunbula'],
    ['میزان', 'Mīzān'],
    ['عقرب', 'Aqrab'],
    ['قوس', 'Qaws'],
    ['جدی', 'Jadi'],
    ['دلو', 'Dalv'],
    ['حوت', 'Hūt'],
  ],
  weekDays: [
    ['ش', 'Shanbeh'],
    ['ی', 'Yekshanbeh'],
    ['د', 'Doshanbeh'],
    ['س', 'Seshanbeh'],
    ['چ', 'Chaharshanbeh'],
    ['پ', 'Panjshanbeh'],
    ['ج', 'Jomeh'],
  ],
  digits: ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'],
  meridiems: [
    ['قبل از ظهر', 'AM'],
    ['بعد از ظهر', 'PM'],
  ],
};

const AfghanDatePicker = ({ value, onChange, name, required = false }) => {
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState(null);

  React.useEffect(() => {
    if (value) {
      try {
        const date = new Date(value);
        if (!isNaN(date.getTime())) {
          setSelectedDate(date);
        }
      } catch (error) {
        console.error('Error parsing date:', error);
      }
    } else {
      setSelectedDate(null);
    }
  }, [value]);

  const handleDateChange = (dateObject) => {
    setSelectedDate(dateObject);

    if (dateObject) {
      try {
        const gregorianDate = dateObject.convert(persian).toDate();
        const formattedDate = gregorianDate.toISOString().split('T')[0];
        console.log(
          'AfghanDatePicker - Selected:',
          dateObject.format(),
          '-> Gregorian:',
          formattedDate
        );

        onChange({ target: { name, value: formattedDate } });
      } catch (error) {
        console.error('Error converting date:', error);
      }
    } else {
      onChange({ target: { name, value: '' } });
    }
  };

  return (
    <div
      className="afghan-date-picker flex  gap-6 flex-wrap md:flex-nowrap justify-between "
      dir="rtl"
    >
      <DatePicker
        value={selectedDate}
        onChange={handleDateChange}
        calendar={persian}
        locale={afghanDariLocale}
        calendarPosition="bottom-right"
        inputClass="w-full border border-gray-200 bg-gray-50/50 rounded-xl py-2 px-4 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
        containerClassName="w-full"
        placeholder={t('selectDate') || 'انتخاب تاریخ'}
        required={required}
        format="YYYY-MM-DD"
        showOtherDays
        digits={['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']}
        zIndex={1000}
        weekDays={['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج']}
      />
    </div>
  );
};

export default AfghanDatePicker;
