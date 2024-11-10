// src/Doctor/Calendar.js
import React from "react";
import "./styles/Calendar.css";

const Calendar = () => {
    const sampleDates = [
        { date: "2024-11-05", title: "Consultation with Patient A" },
        { date: "2024-11-10", title: "Surgery for Patient B" },
        { date: "2024-11-15", title: "Follow-up Appointment for Patient C" },
    ];

    return (
        <div className="calendar-container">
            <h2>Appointment Calendar</h2>
            <div className="calendar-grid">
                {sampleDates.map((appointment, index) => (
                    <div key={index} className="calendar-item">
                        <p>
                            <strong>{appointment.date}</strong>
                        </p>
                        <p>{appointment.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calendar;
