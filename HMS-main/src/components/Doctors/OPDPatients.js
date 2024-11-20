// src/Doctor/OPDPatients.js
import React, { useEffect, useState } from "react";
import api from "../../api";
import "./styles/OPDPatients.css";

const OPDPatients = () => {
  const [opdPatients, setOpdPatients] = useState([]);

  useEffect(() => {
    const fetchOPDPatients = async () => {
      try {
        const response = await api.get("/patients/opd");
        setOpdPatients(response.data);
      } catch (error) {
        console.error("Error fetching OPD patients:", error);
      }
    };
    fetchOPDPatients();
  }, []);

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
