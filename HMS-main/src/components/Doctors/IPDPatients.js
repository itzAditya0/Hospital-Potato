// src/Doctor/IPDPatients.js
import React, { useEffect, useState } from "react";
import api from "../../api";
import { FaUserMd, FaClock, FaUserNurse } from "react-icons/fa";
import "./styles/IPDPatients.css";

const IPDPage = () => {
  const [generalDoctor, setGeneralDoctor] = useState({});
  const [emergencyDoctor, setEmergencyDoctor] = useState({});
  const [nursesOnDuty, setNursesOnDuty] = useState([]);
  const [admittedPatients, setAdmittedPatients] = useState([]);

  useEffect(() => {
    const fetchIPDData = async () => {
      try {
        const [generalDoctorRes, emergencyDoctorRes, nursesRes, patientsRes] =
          await Promise.all([
            api.get("/ipd/general-doctor"),
            api.get("/ipd/emergency-doctor"),
            api.get("/ipd/nurses"),
            api.get("/ipd/patients"),
          ]);

        setGeneralDoctor(generalDoctorRes.data);
        setEmergencyDoctor(emergencyDoctorRes.data);
        setNursesOnDuty(nursesRes.data);
        setAdmittedPatients(patientsRes.data);
      } catch (error) {
        console.error("Error fetching IPD data:", error);
      }
    };
    fetchIPDData();
  }, []);

  return (
    <div className="ipd-container">
      <h2>In-Patient Department (IPD) - Doctors and Nurses on Duty</h2>
      <p className="date-display">{new Date().toDateString()}</p>

      {/* General Doctor Information */}
      <div className="doctor-info">
        <h3>
          <FaUserMd /> General Doctor on Duty
        </h3>
        <p>
          <strong>Name:</strong> {generalDoctor.name}
        </p>
        <p>
          <strong>Specialty:</strong> {generalDoctor.specialty}
        </p>
        <p>
          <strong>Duty Hours:</strong> {generalDoctor.dutyTime}
        </p>
      </div>

      {/* Emergency Doctor Information */}
      <div className="doctor-info">
        <h3>
          <FaUserMd /> Emergency Doctor on Duty
        </h3>
        <p>
          <strong>Name:</strong> {emergencyDoctor.name}
        </p>
        <p>
          <strong>Specialty:</strong> {emergencyDoctor.specialty}
        </p>
        <p>
          <strong>Duty Hours:</strong> {emergencyDoctor.dutyTime}
        </p>
        <p>
          <strong>Contact:</strong> {emergencyDoctor.contact}
        </p>
      </div>

      {/* Round Timings Section */}
      <div className="round-timings">
        <h3>
          <FaClock /> Round Timings
        </h3>
        <ul>
          {generalDoctor.roundTimings &&
            generalDoctor.roundTimings.map((time, index) => (
              <li key={index}>{time}</li>
            ))}
        </ul>
      </div>

      {/* Nurses on Duty Section */}
      <div className="nurses-on-duty">
        <h3>
          <FaUserNurse /> Nurses on Duty
        </h3>
        <table className="nurse-table">
          <thead>
            <tr>
              <th>Nurse Name</th>
              <th>Shift</th>
            </tr>
          </thead>
          <tbody>
            {nursesOnDuty.map((nurse) => (
              <tr key={nurse.id}>
                <td>{nurse.name}</td>
                <td>{nurse.shift}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Admitted Patients Section */}
      <div className="admitted-patients">
        <h3>Admitted Patients</h3>
        <table className="patient-table">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Admission Date</th>
              <th>Discharge Date</th>
            </tr>
          </thead>
          <tbody>
            {admittedPatients.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.name}</td>
                <td>{patient.admissionDate}</td>
                <td>{patient.dischargeDate || "Pending"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IPDPage;
