import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function DashCalendar() {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
  };

  return (
    <>
      <div className="col-sm-12 col-md-6 col-xl-4">
        <div
          className="h-100 bg-sec-custom rounded p-4"
          style={{ maxHeight: "360px", overflow: "auto" }}
        >
          <div className="d-flex align-items-center justify-content-between mb-2">
            <h6 className="mb-0 text-theme">Calendar</h6>
          </div>
          <Calendar
            onChange={handleDateChange}
            value={date}
            className="w-100"
          />
        </div>
      </div>
    </>
  );
}
