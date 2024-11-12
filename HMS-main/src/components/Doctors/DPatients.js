import React, { useState, useEffect } from 'react';
import { FaSearch, FaList, FaTh, FaTimes } from 'react-icons/fa';
import './styles/DPatients.css';

function PatientPage() {
    const [viewMode, setViewMode] = useState("table");
    const [patients, setPatients] = useState([
        { name: 'Elizabeth Polson', history: "Cardiac issues with regular monitoring", prescription: null, date: '2024-10-18' },
        { name: 'John David', history: "Neurological assessments and therapy", prescription: null, date: '2024-10-15' },
        { name: 'Krishtav Rajan', history: "High blood pressure treatment", prescription: null, date: '2024-09-25' },
        { name: 'Sumanth Tinson', history: "Routine check-ups for diabetes management", prescription: null, date: '2024-08-18' },
        { name: 'EG Subramani', history: "Orthopedic surgery with physical therapy follow-ups", prescription: null, date: '2023-10-20' },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [dateFilter, setDateFilter] = useState('all');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [showHistory, setShowHistory] = useState(false);

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

    const handleViewHistory = (patient) => {
        setSelectedPatient(patient);
        setShowHistory(true);
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

    const closePatientModal = () => {
        setShowHistory(false);
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
                        placeholder="    Search by patient name..."
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
                            <th>Date Added</th>
                            <th>View History</th>
                            <th>Upload Prescription</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPatients.map((patient, index) => (
                            <tr key={index}>
                                <td onClick={() => handleViewHistory(patient)}>{patient.name}</td>
                                <td>{patient.date}</td>
                                <td>
                                    <button
                                        className="view-history-btn"
                                        onClick={() => handleViewHistory(patient)}
                                    >
                                        View History
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
                        <div key={index} className="patient-card">
                            <h3 onClick={() => handleViewHistory(patient)}>{patient.name}</h3>
                            <p>Date: {patient.date}</p>
                            <div className="card-buttons">
                                <button 
                                    className="view-history-btn"
                                    onClick={() => handleViewHistory(patient)}
                                >
                                    View History
                                </button>
                                <input type="file" accept=".pdf" onChange={(e) => handleFileUpload(e, index)} />
                                {patient.prescription && <span>Uploaded: {patient.prescription.name}</span>}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showHistory && selectedPatient && (
                <div className="modal-overlay" onClick={closePatientModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <FaTimes className="close-icon" onClick={closePatientModal} />
                        <h3>{selectedPatient.name}</h3>
                        <p><strong>Date Added:</strong> {selectedPatient.date}</p>
                        <p><strong>Medical History:</strong> {selectedPatient.history}</p>
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
