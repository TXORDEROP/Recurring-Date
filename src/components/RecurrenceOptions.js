// src/components/RecurrenceOptions.js
import React from "react";
import { useRecurringDate } from "../context/RecurringDateContext"; // Correct import path for context

const RecurrenceOptions = () => {
  const {
    recurrenceType,
    setRecurrenceType,
    interval,
    setInterval,
    selectedDaysOfWeek,
    setSelectedDaysOfWeek,
    monthlyPattern,
    setMonthlyPattern,
    dayOfMonth,
    setDayOfMonth,
    nthWeek,
    setNthWeek,
    dayOfWeekForNth,
    setDayOfWeekForNth,
    yearlyMonth,
    setYearlyMonth,
    yearlyDay,
    setYearlyDay,
  } = useRecurringDate();

  const handleDayOfWeekChange = (dayIndex) => {
    setSelectedDaysOfWeek((prev) =>
      prev.includes(dayIndex)
        ? prev.filter((d) => d !== dayIndex)
        : [...prev, dayIndex].sort((a, b) => a - b)
    );
  };

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const nthOptions = ["First", "Second", "Third", "Fourth", "Last"];

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-inner mb-4">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">
        Recurrence Pattern
      </h3>

      <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4">
        {["daily", "weekly", "monthly", "yearly"].map((type) => (
          <label key={type} className="inline-flex items-center cursor-pointer">
            <input
              type="radio"
              name="recurrenceType"
              value={type}
              checked={recurrenceType === type}
              onChange={() => setRecurrenceType(type)}
              className="form-radio text-blue-600 h-4 w-4 rounded-full border-gray-300 focus:ring-blue-500"
            />
            <span className="ml-2 capitalize text-gray-700">{type}</span>
          </label>
        ))}
      </div>

      <div className="mb-4">
        <label
          htmlFor="interval"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Repeat every
        </label>
        <div className="flex items-center">
          <input
            type="number"
            id="interval"
            min="1"
            value={interval}
            onChange={(e) =>
              setInterval(Math.max(1, parseInt(e.target.value) || 1))
            }
            className="w-20 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <span className="ml-2 text-gray-700">
            {recurrenceType === "daily" && (interval === 1 ? "day" : "days")}
            {recurrenceType === "weekly" && (interval === 1 ? "week" : "weeks")}
            {recurrenceType === "monthly" &&
              (interval === 1 ? "month" : "months")}
            {recurrenceType === "yearly" && (interval === 1 ? "year" : "years")}
          </span>
        </div>
      </div>

      {recurrenceType === "weekly" && (
        <div className="mb-4 p-3 bg-white rounded-md shadow-sm border border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Repeat on:
          </label>
          <div className="flex flex-wrap gap-2">
            {days.map((day, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleDayOfWeekChange(index)}
                className={`
                  px-3 py-1 text-sm font-medium rounded-full border
                  ${
                    selectedDaysOfWeek.includes(index)
                      ? "bg-blue-600 text-white border-blue-700 shadow-md"
                      : "bg-gray-200 text-gray-700 border-gray-300 hover:bg-gray-300"
                  }
                  transition-colors duration-200 ease-in-out
                `}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      )}

      {recurrenceType === "monthly" && (
        <div className="mb-4 p-3 bg-white rounded-md shadow-sm border border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Monthly Pattern:
          </label>
          <div className="flex flex-col gap-2">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="radio"
                name="monthlyPattern"
                value="day_of_month"
                checked={monthlyPattern === "day_of_month"}
                onChange={() => setMonthlyPattern("day_of_month")}
                className="form-radio text-blue-600 h-4 w-4 rounded-full border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700">
                Day{" "}
                <input
                  type="number"
                  min="1"
                  max="31"
                  value={dayOfMonth}
                  onChange={(e) =>
                    setDayOfMonth(
                      Math.max(1, Math.min(31, parseInt(e.target.value) || 1))
                    )
                  }
                  className="w-16 p-1 border border-gray-300 rounded-md shadow-sm text-sm"
                  disabled={monthlyPattern !== "day_of_month"}
                />{" "}
                of the month
              </span>
            </label>

            <label className="inline-flex items-center cursor-pointer">
              <input
                type="radio"
                name="monthlyPattern"
                value="nth_day_of_week"
                checked={monthlyPattern === "nth_day_of_week"}
                onChange={() => setMonthlyPattern("nth_day_of_week")}
                className="form-radio text-blue-600 h-4 w-4 rounded-full border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700">
                The
                <select
                  value={nthWeek}
                  onChange={(e) => setNthWeek(parseInt(e.target.value))}
                  className="mx-1 p-1 border border-gray-300 rounded-md shadow-sm text-sm"
                  disabled={monthlyPattern !== "nth_day_of_week"}
                >
                  {nthOptions.map((opt, i) => (
                    <option key={opt} value={i + 1}>
                      {opt}
                    </option>
                  ))}
                </select>
                <select
                  value={dayOfWeekForNth}
                  onChange={(e) => setDayOfWeekForNth(parseInt(e.target.value))}
                  className="mx-1 p-1 border border-gray-300 rounded-md shadow-sm text-sm"
                  disabled={monthlyPattern !== "nth_day_of_week"}
                >
                  {days.map((day, i) => (
                    <option key={day} value={i}>
                      {day}
                    </option>
                  ))}
                </select>
                of every month
              </span>
            </label>
          </div>
        </div>
      )}

      {recurrenceType === "yearly" && (
        <div className="mb-4 p-3 bg-white rounded-md shadow-sm border border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Yearly Pattern:
          </label>
          <div className="flex items-center gap-2">
            <span className="text-gray-700">On</span>
            <select
              value={yearlyMonth}
              onChange={(e) => setYearlyMonth(parseInt(e.target.value))}
              className="p-1 border border-gray-300 rounded-md shadow-sm text-sm"
            >
              {months.map((month, i) => (
                <option key={month} value={i}>
                  {month}
                </option>
              ))}
            </select>
            <input
              type="number"
              min="1"
              max="31"
              value={yearlyDay}
              onChange={(e) =>
                setYearlyDay(
                  Math.max(1, Math.min(31, parseInt(e.target.value) || 1))
                )
              }
              className="w-16 p-1 border border-gray-300 rounded-md shadow-sm text-sm"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RecurrenceOptions;
