// src/context/RecurringDateContext.js
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import {
  isSameDay,
  addDays,
  addWeeks,
  addMonths,
  addYears,
  getNthDayOfWeekInMonth,
} from "../utils/dateUtils"; // Correct import path for utils

const RecurringDateContext = createContext();

export const RecurringDateProvider = ({ children }) => {
  const [recurrenceType, setRecurrenceType] = useState("daily");
  const [interval, setInterval] = useState(1);
  const [selectedDaysOfWeek, setSelectedDaysOfWeek] = useState([]);
  const [monthlyPattern, setMonthlyPattern] = useState("day_of_month");
  const [dayOfMonth, setDayOfMonth] = useState(1);
  const [nthWeek, setNthWeek] = useState(1);
  const [dayOfWeekForNth, setDayOfWeekForNth] = useState(0);
  const [yearlyMonth, setYearlyMonth] = useState(0);
  const [yearlyDay, setYearlyDay] = useState(1);

  const [startDate, setStartDate] = useState(new Date());
  const [hasEndDate, setHasEndDate] = useState(false);
  const [endDate, setEndDate] = useState(null);

  const [recurringDates, setRecurringDates] = useState([]);

  const calculateRecurringDates = useCallback(() => {
    if (!startDate) {
      setRecurringDates([]);
      return;
    }

    const calculatedDates = [];
    let currentDate = new Date(startDate);
    const maxIterations = 500;

    for (let i = 0; i < maxIterations; i++) {
      if (hasEndDate && endDate && currentDate > endDate) {
        break;
      }

      let dateToAdd = null;

      switch (recurrenceType) {
        case "daily":
          dateToAdd = new Date(currentDate);
          currentDate = addDays(currentDate, interval);
          break;
        case "weekly":
          let foundNextDay = false;
          let tempDate = new Date(currentDate);
          for (let j = 0; j < 7; j++) {
            if (selectedDaysOfWeek.includes(tempDate.getDay())) {
              dateToAdd = new Date(tempDate);
              foundNextDay = true;
              break;
            }
            tempDate = addDays(tempDate, 1);
          }
          if (!foundNextDay && selectedDaysOfWeek.length > 0) {
            tempDate = addDays(currentDate, 7 - currentDate.getDay());
            for (let j = 0; j < 7; j++) {
              if (selectedDaysOfWeek.includes(tempDate.getDay())) {
                dateToAdd = new Date(tempDate);
                break;
              }
              tempDate = addDays(tempDate, 1);
            }
          } else if (selectedDaysOfWeek.length === 0) {
            dateToAdd = new Date(currentDate);
          }

          if (dateToAdd) {
            currentDate = addWeeks(dateToAdd, interval);
          } else {
            currentDate = addWeeks(currentDate, interval);
          }
          break;
        case "monthly":
          if (monthlyPattern === "day_of_month") {
            const tempMonthDate = new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              dayOfMonth
            );
            if (tempMonthDate.getMonth() !== currentDate.getMonth()) {
              dateToAdd = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth() + 1,
                0
              );
            } else {
              dateToAdd = tempMonthDate;
            }
            currentDate = addMonths(currentDate, interval);
          } else {
            const targetDate = getNthDayOfWeekInMonth(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              nthWeek,
              dayOfWeekForNth
            );
            if (targetDate && targetDate >= startDate) {
              dateToAdd = targetDate;
            }
            currentDate = addMonths(currentDate, interval);
          }
          break;
        case "yearly":
          const targetYearlyDate = new Date(
            currentDate.getFullYear(),
            yearlyMonth,
            yearlyDay
          );
          if (targetYearlyDate < startDate) {
            currentDate = addYears(currentDate, interval);
            continue;
          }
          dateToAdd = targetYearlyDate;
          currentDate = addYears(currentDate, interval);
          break;
        default:
          break;
      }

      if (
        dateToAdd &&
        dateToAdd >= startDate &&
        (!hasEndDate || !endDate || dateToAdd <= endDate)
      ) {
        if (!calculatedDates.some((d) => isSameDay(d, dateToAdd))) {
          calculatedDates.push(dateToAdd);
        }
      }
    }
    setRecurringDates(calculatedDates.sort((a, b) => a - b));
  }, [
    recurrenceType,
    interval,
    selectedDaysOfWeek,
    monthlyPattern,
    dayOfMonth,
    nthWeek,
    dayOfWeekForNth,
    yearlyMonth,
    yearlyDay,
    startDate,
    hasEndDate,
    endDate,
  ]);

  useEffect(() => {
    calculateRecurringDates();
  }, [calculateRecurringDates]);

  const value = useMemo(
    () => ({
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
      startDate,
      setStartDate,
      hasEndDate,
      setHasEndDate,
      endDate,
      setEndDate,
      recurringDates,
      calculateRecurringDates,
    }),
    [
      recurrenceType,
      interval,
      selectedDaysOfWeek,
      monthlyPattern,
      dayOfMonth,
      nthWeek,
      dayOfWeekForNth,
      yearlyMonth,
      yearlyDay,
      startDate,
      hasEndDate,
      endDate,
      recurringDates,
      calculateRecurringDates,
    ]
  );

  return (
    <RecurringDateContext.Provider value={value}>
      {children}
    </RecurringDateContext.Provider>
  );
};

export const useRecurringDate = () => {
  const context = useContext(RecurringDateContext);
  if (context === undefined) {
    throw new Error(
      "useRecurringDate must be used within a RecurringDateProvider"
    );
  }
  return context;
};
