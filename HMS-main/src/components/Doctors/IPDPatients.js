// IPDPage.js
import React, { useState } from 'react';
import { FaUserMd, FaClock, FaUserNurse } from 'react-icons/fa';
import './styles/IPDPatients.css';

const IPDPage = () => {
    const [viewMode, setViewMode] = useState('table'); // View mode: 'table' or 'card'

    // Sample data for general and emergency doctors, round timings, and nurses on duty
    const generalDoctor = {
        id: 1,
        name: 'Dr. John Doe',
        specialty: 'Internal Medicine',
        dutyTime: '8:00 AM - 5:00 PM',
        roundTimings: ['9:00 AM', '1:00 PM', '5:00 PM']
    };

    const emergencyDoctor = {
        id: 2,
        name: 'Dr. Alice Smith',
        specialty: 'Emergency Medicine',
        dutyTime: '24/7 On-Call',
        contact: 'Ext. 110'
    };

    const nursesOnDuty = [
        { id: 1, name: 'Nurse Emma', shift: 'Morning (8:00 AM - 2:00 PM)' },
        { id: 2, name: 'Nurse Olivia', shift: 'Afternoon (2:00 PM - 8:00 PM)' },
        { id: 3, name: 'Nurse Liam', shift: 'Night (8:00 PM - 8:00 AM)' }
    ];

    const admittedPatients = [
        { id: 1, name: 'Elizabeth Polson', admissionDate: '2023-11-01', dischargeDate: '2023-11-10' },
        { id: 2, name: 'John David', admissionDate: '2023-11-03', dischargeDate: 'Pending' },
        { id: 3, name: 'Lucy Heart', admissionDate: '2023-11-05', dischargeDate: 'Pending' }
    ];

    return (
        <div className="ipd-container">
            <h2>In-Patient Department (IPD) - Doctors and Nurses on Duty</h2>
            <p className="date-display">{new Date().toDateString()}</p>

            {/* General Doctor Information */}
            <div className="doctor-info">
                <h3><FaUserMd /> General Doctor on Duty</h3>
                <p><strong>Name:</strong> {generalDoctor.name}</p>
                <p><strong>Specialty:</strong> {generalDoctor.specialty}</p>
                <p><strong>Duty Hours:</strong> {generalDoctor.dutyTime}</p>
            </div>

            {/* Emergency Doctor Information */}
            <div className="doctor-info">
                <h3><FaUserMd /> Emergency Doctor on Duty</h3>
                <p><strong>Name:</strong> {emergencyDoctor.name}</p>
                <p><strong>Specialty:</strong> {emergencyDoctor.specialty}</p>
                <p><strong>Duty Hours:</strong> {emergencyDoctor.dutyTime}</p>
                <p><strong>Contact:</strong> {emergencyDoctor.contact}</p>
            </div>

            {/* Round Timings Section */}
            <div className="round-timings">
                <h3><FaClock /> Round Timings</h3>
                <ul>
                    {generalDoctor.roundTimings.map((time, index) => (
                        <li key={index}>{time}</li>
                    ))}
                </ul>
            </div>

            {/* Nurses on Duty Section */}
            <div className="nurses-on-duty">
                <h3><FaUserNurse /> Nurses on Duty</h3>
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
                                <td>{patient.dischargeDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default IPDPage;
