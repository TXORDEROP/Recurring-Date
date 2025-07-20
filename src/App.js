// src/App.js
import React from "react";
// Import the components and context from their new locations
import { RecurringDateProvider } from "./context/RecurringDateContext";
import RecurrenceOptions from "./components/RecurrenceOptions";
import DateRangeSelector from "./components/DateRangeSelector";
import CalendarPreview from "./components/CalendarPreview";

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-2xl p-6 sm:p-8 border border-gray-200">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
          RecurSync
        </h1>
        <p className="text-gray-600 mb-8 text-center max-w-prose mx-auto">
          Select your desired recurrence pattern, define a start and optional
          end date, and see the calculated recurring dates in the preview
          calendar below.
        </p>

        <RecurringDateProvider>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <RecurrenceOptions />
              <DateRangeSelector />
            </div>
            <div>
              <CalendarPreview />
            </div>
          </div>
        </RecurringDateProvider>
      </div>
    </div>
  );
};

export default App;
