import React, { useState } from "react";
import "./App.css";

const calendarDates = Array(31)
  .fill(0)
  .map((e, i) => i);

export const App = () => {
  const [choosingType, setChoosingType] = useState("start"); // start or end
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const updateDay = (chosenDay) => {
    // handle if a user chose before our current range
    if (startDate && chosenDay < startDate) {
      setStartDate(chosenDay);
      return setChoosingType("end");
    }

    // handle if a user chose after our current range
    if (endDate && chosenDay > endDate) {
      setEndDate(chosenDay);
      return setChoosingType("end");
    }

    if (choosingType === "start") {
      setStartDate(chosenDay);
      return setChoosingType("end");
    }

    if (choosingType === "end") {
      setEndDate(chosenDay);
      setChoosingType("start"); //for the case choose the end date before start date
    }
  };

  return (
    <>
      <div className="date-chooser">
        <button
          className="date-chooser-button"
          onClick={() => setChoosingType("start")}
        >
          Start Date <span>{startDate}</span>
        </button>
        <button
          className="date-chooser-button"
          onClick={() => setChoosingType("end")}
        >
          End Date <span>{endDate}</span>
        </button>
      </div>

      <div className="calendar">
        {calendarDates.map((day, index) => {
          const dayNumber = day + 1;
          return (
            <button
              key={index}
              onClick={() => updateDay(dayNumber)}
              className="calendar-day"
            >
              {dayNumber}
            </button>
          );
        })}
      </div>
    </>
  );
};
