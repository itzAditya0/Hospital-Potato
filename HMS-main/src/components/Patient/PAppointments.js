// src/components/Patient/PAppointments.js
import React, { useState, useEffect, useContext } from "react";
import api from "../../api";
import "./Styles/PAppointments.css";
import { AuthContext } from "../../context/AuthContext";

const PAppointments = () => {
  const { user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await api.get(`/api/appointments/${user._id}`);
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    fetchAppointments();
  }, [user]);

  return (
    <div className="appointments-page">
      <h2>My Appointments</h2>
      <table>
        <thead>
          <tr>
            <th>Doctor</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <tr key={appointment._id}>
                <td>{appointment.doctor}</td>
                <td>{appointment.date}</td>
                <td>{appointment.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No appointments scheduled.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PAppointments;
