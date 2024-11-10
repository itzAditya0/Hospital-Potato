// src/Doctor/OPDPatients.js
import React from "react";
import "./styles/OPDPatients.css";

const OPDPatients = ({ patients }) => {
    const opdPatients = patients.filter((patient) => patient.type === "OPD");

    return (
        <div className="opd-patients-container">
            <h3>Out-Patient Department (OPD)</h3>
            <table className="opd-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Appointment Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {opdPatients.map((patient) => (
                        <tr key={patient.id}>
                            <td>{patient.name}</td>
                            <td>{patient.appointmentDate}</td>
                            <td>{patient.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OPDPatients;
