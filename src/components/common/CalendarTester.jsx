import React, { useState } from 'react';
import { useDateFormatter } from '../../hooks/useDateFormatter';
import DateInput from './DateInput';

const CalendarTester = () => {
  const { currentCalendar, setCalendar, formatDisplay } = useDateFormatter();
  const [testDate, setTestDate] = useState('2024-01-15');

  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h3 className="font-bold mb-4">Calendar Debugger</h3>

      <div className="space-y-4">
        <div>
          <label>Current Calendar: {currentCalendar}</label>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => setCalendar('gregorian')}
              className="px-3 py-1 bg-blue-500 text-white rounded"
            >
              Gregorian
            </button>
            <button
              onClick={() => setCalendar('persian')}
              className="px-3 py-1 bg-green-500 text-white rounded"
            >
              Persian
            </button>
          </div>
        </div>

        <div>
          <label>Test Date Input:</label>
          <DateInput
            name="testDate"
            value={testDate}
            onChange={(e) => setTestDate(e.target.value)}
          />
        </div>

        <div>
          <label>Stored Value (Gregorian): {testDate}</label>
        </div>

        <div>
          <label>Display Value: {formatDisplay(testDate)}</label>
        </div>
      </div>
    </div>
  );
};

export default CalendarTester;
