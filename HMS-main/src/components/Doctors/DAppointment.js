// src/Doctor/DAppointment.js
import React, { useState } from "react";
import "./styles/DAppointment.css";

const DAppointment = () => {
    // Sample appointment data
    const [appointments, setAppointments] = useState([
        {
            id: 1,
            patientName: "Alice Brown",
            time: "10:00 AM",
            status: "Confirmed",
        },
        {
            id: 2,
            patientName: "Tom White",
            time: "11:30 AM",
            status: "Pending",
        },
        {
            id: 3,
            patientName: "Lucy Black",
            time: "1:00 PM",
            status: "Cancelled",
        },
    ]);

    // Function to update the status of an appointment
    const handleStatusChange = (id, newStatus) => {
        setAppointments(
            appointments.map((appointment) =>
                appointment.id === id
                    ? { ...appointment, status: newStatus }
                    : appointment,
            ),
        );
    };

    return (
        <div className="dappointment-container">
            <h3>Appointments</h3>
            <table className="appointments-table">
                <thead>
                    <tr>
                        <th>Patient Name</th>
                        <th>Time</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment) => (
                        <tr key={appointment.id}>
                            <td>{appointment.patientName}</td>
                            <td>{appointment.time}</td>
                            <td
                                className={`status-${appointment.status.toLowerCase()}`}
                            >
                                {appointment.status}
                            </td>
                            <td>
                                <select
                                    value={appointment.status}
                                    onChange={(e) =>
                                        handleStatusChange(
                                            appointment.id,
                                            e.target.value,
                                        )
                                    }
                                >
                                    <option value="Confirmed">Confirmed</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DAppointment;
