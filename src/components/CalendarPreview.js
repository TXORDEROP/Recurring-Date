// src/components/CalendarPreview.js
import React, { useState, useEffect, useMemo } from "react";
import { useRecurringDate } from "../context/RecurringDateContext"; // Correct import path for context
import { isSameDay } from "../utils/dateUtils"; // Correct import path for utils

const CalendarPreview = () => {
  const { recurringDates, startDate } = useRecurringDate();
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    if (startDate) {
      setCurrentMonth(startDate.getMonth());
      setCurrentYear(startDate.getFullYear());
    }
  }, [startDate]);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getCalendarDays = (year, month) => {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const numDaysInMonth = lastDayOfMonth.getDate();

    const startDayOfWeek = firstDayOfMonth.getDay();

    const days = [];

    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(null);
    }

    for (let i = 1; i <= numDaysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const calendarDays = useMemo(
    () => getCalendarDays(currentYear, currentMonth),
    [currentYear, currentMonth]
  );

  const handlePrevMonth = () => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 0) {
        setCurrentYear((prevYear) => prevYear - 1);
        return 11;
      }
      return prevMonth - 1;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 11) {
        setCurrentYear((prevYear) => prevYear + 1);
        return 0;
      }
      return prevMonth + 1;
    });
  };

  const monthName = new Date(currentYear, currentMonth).toLocaleString(
    "default",
    { month: "long" }
  );

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-inner">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">
        Recurring Dates Preview
      </h3>

      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handlePrevMonth}
          className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
          aria-label="Previous month"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <span className="text-xl font-bold text-gray-800">
          {monthName} {currentYear}
        </span>
        <button
          onClick={handleNextMonth}
          className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
          aria-label="Next month"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {daysOfWeek.map((day) => (
          <div key={day} className="font-semibold text-sm text-gray-600 py-1">
            {day}
          </div>
        ))}
        {calendarDays.map((day, index) => (
          <div
            key={index}
            className={`
              relative p-1 h-10 flex items-center justify-center rounded-md text-sm
              ${day ? "bg-white text-gray-800" : "bg-gray-100"}
              ${
                day && isSameDay(day, new Date())
                  ? "border-2 border-blue-500 font-bold"
                  : ""
              }
              ${
                day && recurringDates.some((rd) => isSameDay(rd, day))
                  ? "bg-green-200 text-green-800 font-bold shadow-sm"
                  : ""
              }
            `}
          >
            {day ? day.getDate() : ""}
            {day && recurringDates.some((rd) => isSameDay(rd, day)) && (
              <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full transform translate-x-1 translate-y-1"></span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarPreview;
