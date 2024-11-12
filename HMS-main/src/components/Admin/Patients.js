import React, { useState, useEffect } from 'react';
import { FaSearch, FaList, FaTh, FaTimes } from 'react-icons/fa';
import './Styles/Patients.css';

function PatientPage() {
    const [viewMode, setViewMode] = useState("table");
    const [patients, setPatients] = useState([
        { name: 'Elizabeth Polson', doctor: 'Dr. John', department: 'Cardiology', isApproved: false, prescription: null, date: '2024-10-18' },
        { name: 'John David', doctor: 'Dr. Joel', department: 'Neurology', isApproved: false, prescription: null, date: '2024-10-15' },
        { name: 'Krishtav Rajan', doctor: 'Dr. Joel', department: 'Neurology', isApproved: false, prescription: null, date: '2024-09-25' },
        { name: 'Sumanth Tinson', doctor: 'Dr. John', department: 'Cardiology', isApproved: false, prescription: null, date: '2024-08-18' },
        { name: 'EG Subramani', doctor: 'Dr. John', department: 'Orthopedics', isApproved: false, prescription: null, date: '2023-10-20' },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [dateFilter, setDateFilter] = useState('all');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const today = new Date();

    useEffect(() => {
        const filtered = patients.filter(patient => {
            const patientDate = new Date(patient.date);

            switch (dateFilter) {
                case 'day':
                    return patientDate.toDateString() === today.toDateString();
                case 'week':
                    const weekStart = new Date(today);
                    weekStart.setDate(today.getDate() - today.getDay());
                    return patientDate >= weekStart && patientDate <= today;
                case 'month':
                    return (
                        patientDate.getMonth() === today.getMonth() &&
                        patientDate.getFullYear() === today.getFullYear()
                    );
                case 'year':
                    return patientDate.getFullYear() === today.getFullYear();
                default:
                    return true;
            }
        }).filter(patient =>
            patient.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredPatients(filtered);
    }, [searchTerm, dateFilter, patients]);

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

    const handleFilterChange = (filter) => {
        setDateFilter(filter);
        setDropdownOpen(false);
    };

    const openPatientModal = (patient) => {
        setSelectedPatient(patient);
    };

    const closePatientModal = () => {
        setSelectedPatient(null);
    };

    return (
        <div className="patient-page">
            <h2>Patient List</h2>

            <div className="view-toggle-container">
                <button 
                    className={`view-toggle ${viewMode === "table" ? "active" : ""}`}
                    onClick={() => setViewMode("table")}
                >
                    <FaList /> Table View
                </button>
                <button 
                    className={`view-toggle ${viewMode === "card" ? "active" : ""}`}
                    onClick={() => setViewMode("card")}
                >
                    <FaTh /> Card View
                </button>
            </div>

            <div className="filter-container">
                <div className="search-input-container">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder=" 🔍 Search by patient name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>

                <div className="filters-dropdown">
                    <button
                        className="filters-button"
                        aria-haspopup="true"
                        aria-expanded={dropdownOpen}
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        Filter by <span className="arrow-down">&#9662;</span>
                    </button>
                    {dropdownOpen && (
                        <div className="dropdown-content">
                            <button onClick={() => handleFilterChange('all')}>All</button>
                            <button onClick={() => handleFilterChange('day')}>Today</button>
                            <button onClick={() => handleFilterChange('week')}>This Week</button>
                            <button onClick={() => handleFilterChange('month')}>This Month</button>
                            <button onClick={() => handleFilterChange('year')}>This Year</button>
                        </div>
                    )}
                </div>
            </div>

            {viewMode === "table" ? (
                <table>
                    <thead>
                        <tr>
                            <th>Patient Name</th>
                            <th>Doctor Assigned</th>
                            <th>Department</th>
                            <th>Date Added</th>
                            <th>Approve Document</th>
                            <th>Upload Prescription</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPatients.map((patient, index) => (
                            <tr key={index}>
                                <td onClick={() => openPatientModal(patient)}>{patient.name}</td>
                                <td>{patient.doctor}</td>
                                <td>{patient.department}</td>
                                <td>{patient.date}</td>
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
            ) : (
                <div className="card-container">
                    {filteredPatients.map((patient, index) => (
                        <div key={index} className={`patient-card ${patient.isApproved ? 'approved' : ''}`}>
                            <h3 onClick={() => openPatientModal(patient)}>{patient.name}</h3>
                            <p>Doctor: {patient.doctor}</p>
                            <p>Department: {patient.department}</p>
                            <p>Date: {patient.date}</p>
                            <div className="card-buttons">
                                <button 
                                    className={`approve-btn ${patient.isApproved ? 'approved' : ''}`}
                                    onClick={() => handleApprove(index)}
                                >
                                    {patient.isApproved ? 'Approved' : 'Approve'}
                                </button>
                                <input type="file" accept=".pdf" onChange={(e) => handleFileUpload(e, index)} />
                                {patient.prescription && <span>Uploaded: {patient.prescription.name}</span>}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {selectedPatient && (
                <div className="modal-overlay" onClick={closePatientModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <FaTimes className="close-icon" onClick={closePatientModal} />
                        <h3>{selectedPatient.name}</h3>
                        <p><strong>Doctor:</strong> {selectedPatient.doctor}</p>
                        <p><strong>Department:</strong> {selectedPatient.department}</p>
                        <p><strong>Date Added:</strong> {selectedPatient.date}</p>
                        <p><strong>Status:</strong> {selectedPatient.isApproved ? "Approved" : "Pending"}</p>
                        {selectedPatient.prescription && (
                            <p><strong>Prescription:</strong> {selectedPatient.prescription.name}</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default PatientPage;
