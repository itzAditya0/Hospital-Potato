// src/Doctor/IPDPatients.js
import React from "react";
import "./styles/IPDPatients.css";

const IPDPatients = () => {
    const patients = [
        { name: "Patient X", room: 101, condition: "Stable" },
        { name: "Patient Y", room: 102, condition: "Critical" },
        { name: "Patient Z", room: 103, condition: "Recovering" },
    ];

    return (
        <div className="ipd-patients-container">
            <h2>In-Patient Department</h2>
            <table className="ipd-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Room</th>
                        <th>Condition</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map((patient, index) => (
                        <tr key={index}>
                            <td>{patient.name}</td>
                            <td>{patient.room}</td>
                            <td
                                className={`condition-${patient.condition.toLowerCase()}`}
                            >
                                {patient.condition}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default IPDPatients;
