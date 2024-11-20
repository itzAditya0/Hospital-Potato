// src/Doctor/ScheduledPatients.js
import React, { useEffect, useState } from "react";
import api from "../../api";
import "./styles/ScheduledPatients.css";

const ScheduledPatients = () => {
  const [scheduledPatients, setScheduledPatients] = useState([]);

  useEffect(() => {
    const fetchScheduledPatients = async () => {
      try {
        const response = await api.get("/appointments/scheduled");
        setScheduledPatients(response.data);
      } catch (error) {
        console.error("Error fetching scheduled patients:", error);
      }
    };
    fetchScheduledPatients();
  }, []);

  return (
    <div className="scheduled-patients-container">
      <h2>Scheduled Patients</h2>
      <ul className="patient-list">
        {scheduledPatients.map((patient, index) => (
          <li key={index} className="patient-item">
            <p>
              <strong>{patient.name}</strong> - {patient.time}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScheduledPatients;
