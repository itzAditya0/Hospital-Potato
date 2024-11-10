// src/Doctor/DPatients.js
import React, { useState } from "react";
import "./styles/DPatients.css";

const DPatients = () => {
    // Sample patient data
    const [patients, setPatients] = useState([
        { id: 1, name: "Alice Brown", age: 34, status: "Admitted" },
        { id: 2, name: "Tom White", age: 29, status: "Discharged" },
        { id: 3, name: "Lucy Black", age: 45, status: "Under Observation" },
    ]);

    // Function to update the status of a patient
    const handleStatusChange = (id, newStatus) => {
        setPatients(
            patients.map((patient) =>
                patient.id === id ? { ...patient, status: newStatus } : patient,
            ),
        );
    };

    return (
        <div className="dpatients-container">
            <h3>Patients</h3>
            <table className="patients-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map((patient) => (
                        <tr key={patient.id}>
                            <td>{patient.name}</td>
                            <td>{patient.age}</td>
                            <td
                                className={`status-${patient.status.replace(" ", "").toLowerCase()}`}
                            >
                                {patient.status}
                            </td>
                            <td>
                                <select
                                    value={patient.status}
                                    onChange={(e) =>
                                        handleStatusChange(
                                            patient.id,
                                            e.target.value,
                                        )
                                    }
                                >
                                    <option value="Admitted">Admitted</option>
                                    <option value="Discharged">
                                        Discharged
                                    </option>
                                    <option value="Under Observation">
                                        Under Observation
                                    </option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DPatients;
