// src/components/DateRangeSelector.js
import React from "react";
import { useRecurringDate } from "../context/RecurringDateContext"; // Correct import path for context
import { addDays } from "../utils/dateUtils"; // Correct import path for utils

const DateRangeSelector = () => {
  const {
    startDate,
    setStartDate,
    hasEndDate,
    setHasEndDate,
    endDate,
    setEndDate,
  } = useRecurringDate();

  const formatDateForInput = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-inner mb-4">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">Date Range</h3>

      <div className="mb-3">
        <label
          htmlFor="startDate"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Start Date:
        </label>
        <input
          type="date"
          id="startDate"
          value={formatDateForInput(startDate)}
          onChange={(e) => setStartDate(new Date(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div className="flex items-center mb-3">
        <input
          type="checkbox"
          id="hasEndDate"
          checked={hasEndDate}
          onChange={(e) => {
            setHasEndDate(e.target.checked);
            if (!e.target.checked) {
              setEndDate(null);
            } else {
              setEndDate(addDays(startDate, 30)); // Default end date 30 days from start
            }
          }}
          className="form-checkbox text-blue-600 h-4 w-4 rounded border-gray-300 focus:ring-blue-500"
        />
        <label
          htmlFor="hasEndDate"
          className="ml-2 text-sm font-medium text-gray-700"
        >
          Has End Date
        </label>
      </div>

      {hasEndDate && (
        <div>
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            End Date:
          </label>
          <input
            type="date"
            id="endDate"
            value={formatDateForInput(endDate)}
            onChange={(e) => setEndDate(new Date(e.target.value))}
            min={formatDateForInput(startDate)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      )}
    </div>
  );
};

export default DateRangeSelector;
