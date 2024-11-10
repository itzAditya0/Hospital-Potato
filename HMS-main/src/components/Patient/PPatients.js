import React, { useState } from 'react';
import './Styles/PPatients.css';

function PatientPage() {
    const [patients] = useState([
        { name: 'Elizabeth Polson', doctor: 'Dr. John', appointmentTime: '10:00 AM', prescription: null },
        { name: 'John David', doctor: 'Dr. Joel', appointmentTime: '11:00 AM', prescription: null }
    ]);

    const handleDownload = (index) => {
        const patient = patients[index];
        if (patient.prescription) {
            const url = URL.createObjectURL(patient.prescription);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', patient.prescription.name);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div className="patient-page">
            <h2>Patient List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Patient Name</th>
                        <th>Doctor Assigned</th>
                        <th>Appointment Time</th>
                        <th>Prescription</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map((patient, index) => (
                        <tr key={index}>
                            <td>{patient.name}</td>
                            <td>{patient.doctor}</td>
                            <td>{patient.appointmentTime}</td>
                            <td>
                                {patient.prescription ? (
                                    <button className="view-download-btn" onClick={() => handleDownload(index)}>
                                        View/Download
                                    </button>
                                ) : (
                                    <span>No document</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PatientPage;