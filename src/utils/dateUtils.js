// src/utils/dateUtils.js
export const isSameDay = (d1, d2) => {
  return (
    d1 &&
    d2 &&
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

export const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

export const getStartOfWeek = (date) => {
  const d = new Date(date);
  const day = d.getDay(); // 0 for Sunday, 6 for Saturday
  d.setDate(d.getDate() - day); // Go back to Sunday
  return d;
};

export const addDays = (date, days) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
};

export const addWeeks = (date, weeks) => {
  return addDays(date, weeks * 7);
};

export const addMonths = (date, months) => {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  // Handle cases where the original day doesn't exist in the new month
  if (d.getDate() !== new Date(date).getDate()) {
    d.setDate(0); // Set to the last day of the previous month
  }
  return d;
};

export const addYears = (date, years) => {
  const d = new Date(date);
  d.setFullYear(d.getFullYear() + years);
  return d;
};

export const getNthDayOfWeekInMonth = (year, month, nthWeek, dayOfWeek) => {
  const firstDayOfMonth = new Date(year, month, 1);
  let currentDay = new Date(firstDayOfMonth);
  let count = 0;
  let foundDate = null;

  // Find the first occurrence of dayOfWeek in the month
  while (currentDay.getDay() !== dayOfWeek) {
    currentDay = addDays(currentDay, 1);
  }

  // Iterate to the nth occurrence
  while (count < nthWeek) {
    if (currentDay.getMonth() === month) {
      foundDate = new Date(currentDay);
      count++;
    }
    currentDay = addDays(currentDay, 7); // Move to the next week
    if (currentDay.getMonth() !== month && count < nthWeek) {
      // If we've gone past the month and haven't found the nth, it doesn't exist
      return null;
    }
  }
  return foundDate;
};
