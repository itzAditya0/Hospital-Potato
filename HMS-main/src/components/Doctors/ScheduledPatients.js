// src/Doctor/ScheduledPatients.js
import React from "react";
import "./styles/ScheduledPatients.css";

const ScheduledPatients = () => {
    const scheduledPatients = [
        { name: "Patient A", time: "10:00 AM" },
        { name: "Patient B", time: "11:30 AM" },
        { name: "Patient C", time: "2:00 PM" },
    ];

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
