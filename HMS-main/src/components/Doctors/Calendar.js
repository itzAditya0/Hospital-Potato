// src/Doctor/Calendar.js
import React, { useEffect, useState } from "react";
import api from "../../api";
import "./styles/Calendar.css";

const Calendar = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await api.get("/appointments/upcoming");
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    fetchAppointments();
  }, []);

  return (
    <div className="calendar-container">
      <h2>Appointment Calendar</h2>
      <div className="calendar-grid">
        {appointments.map((appointment, index) => (
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
