import React, { useState } from 'react';
import './Styles/Patients.css';

function PatientPage() {
    const [patients, setPatients] = useState([
        { name: 'Elizabeth Polson', doctor: 'Dr. John', isApproved: false, prescription: null },
        { name: 'John David', doctor: 'Dr. Joel', isApproved: false, prescription: null },
        { name: 'Krishtav Rajan', doctor: 'Dr. Joel', isApproved: false, prescription: null },
        { name: 'Sumanth Tinson', doctor: 'Dr. John', isApproved: false, prescription: null },
        { name: 'EG Subramani', doctor: 'Dr. John', isApproved: false, prescription: null },
    ]);

    const handleApprove = (index) => {
        const newPatients = [...patients];
        newPatients[index].isApproved = !newPatients[index].isApproved;
        setPatients(newPatients);
    };

    const handleFileUpload = (e, index) => {
        const file = e.target.files[0];
        const newPatients = [...patients];
        newPatients[index].prescription = file;
        setPatients(newPatients);
    };

    return (
        <div className="patient-page">
            <h2>Patient List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Patient Name</th>
                        <th>Doctor Assigned</th>
                        <th>Approve Document</th>
                        <th>Upload Prescription</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map((patient, index) => (
                        <tr key={index}>
                            <td>{patient.name}</td>
                            <td>{patient.doctor}</td>
                            <td>
                                <button
                                    className={`approve-btn ${patient.isApproved ? 'approved' : ''}`}
                                    onClick={() => handleApprove(index)}
                                >
                                    {patient.isApproved ? 'Approved' : 'Approve Document'}
                                </button>
                            </td>
                            <td>
                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={(e) => handleFileUpload(e, index)}
                                />
                                {patient.prescription && (
                                    <span>Uploaded: {patient.prescription.name}</span>
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
