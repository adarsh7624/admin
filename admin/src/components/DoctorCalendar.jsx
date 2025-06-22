import React, { useState } from "react";

const DoctorCalendar = () => {
  const today = new Date();

  const [calendarDate, setCalendarDate] = useState({
    month: today.getMonth(),
    year: today.getFullYear(),
  });

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysInMonth = getDaysInMonth(calendarDate.month, calendarDate.year);

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <select
          value={calendarDate.month}
          onChange={(e) =>
            setCalendarDate({ ...calendarDate, month: parseInt(e.target.value) })
          }
          className="border p-1 rounded text-sm"
        >
          {monthNames.map((m, i) => (
            <option key={i} value={i}>{m}</option>
          ))}
        </select>

        <input
          type="number"
          value={calendarDate.year}
          onChange={(e) =>
            setCalendarDate({ ...calendarDate, year: parseInt(e.target.value) })
          }
          className="border p-1 rounded text-sm w-24"
        />
      </div>

      <div className="grid grid-cols-7 gap-2 text-center">
        {[...Array(daysInMonth)].map((_, i) => {
          const isToday =
            i + 1 === today.getDate() &&
            calendarDate.month === today.getMonth() &&
            calendarDate.year === today.getFullYear();

          return (
            <div
              key={i}
              className={`p-2 rounded-full ${
                isToday ? "bg-red-500 text-white font-bold" : "bg-gray-100 text-gray-800"
              }`}
            >
              {i + 1}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DoctorCalendar;
