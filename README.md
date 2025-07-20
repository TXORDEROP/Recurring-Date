# Recurring-Date
A powerful and reusable React component for selecting and visualizing complex recurring date patterns, inspired by popular scheduling apps. Built with React and styled beautifully with Tailwind CSS.
# RecurSync: Recurring Date Picker Component

## Overview

RecurSync is a highly customizable and reusable React component designed to simplify the process of defining and visualizing recurring date schedules. Inspired by the intuitive recurrence features found in modern calendar and task management applications, this component provides a comprehensive solution for setting up complex repeating events.

## Features

* **Flexible Recurrence Options:**
    * **Daily:** Repeat every X days.
    * **Weekly:** Repeat every X weeks on specific days of the week (e.g., every 2 weeks on Mon, Wed, Fri).
    * **Monthly:**
        * Repeat on a specific day of the month (e.g., the 15th of every month).
        * Repeat on the Nth day of the week (e.g., the second Tuesday of every month).
    * **Yearly:** Repeat every X years on a specific month and day.
* **Date Range Management:**
    * Define a clear start date for the recurrence.
    * Optionally set an end date to limit the recurrence period.
* **Live Preview Calendar:**
    * Visually highlights all calculated recurring dates on an interactive mini-calendar.
    * Navigate through months to see future occurrences.
* **Upcoming Dates List:**
    * Provides a clear, scrollable list of the next few upcoming recurring dates, mimicking a task list view.

## Technologies Used

* **React:** The core JavaScript library for building the user interface.
* **Tailwind CSS:** A utility-first CSS framework for rapid and responsive styling.
* **React Context API:** Used for efficient and centralized state management across the component.
* **JavaScript Date Objects:** Pure JavaScript for all date calculation logic.

## Why RecurSync?

This component is ideal for applications requiring robust scheduling capabilities, such as:
* Task managers
* Event planners
* Subscription services
* Appointment booking systems
* Personal reminders

It offers a clean, intuitive UI that makes defining complex recurrence rules straightforward for end-users.

## Getting Started

To run this project locally:

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd recurring-date-picker-app
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Ensure Tailwind CSS is configured:**
    Verify `tailwind.config.js` and `postcss.config.js` are set up correctly as per Tailwind's documentation.
    (If you faced PostCSS errors, ensure `@tailwindcss/postcss` is installed and `postcss.config.js` looks like this:
    ```javascript
    // postcss.config.js
    module.exports = {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    };
    ```
    )
4.  **Start the development server:**
    ```bash
    npm start
    ```

The application will be available at `http://localhost:3000`.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

