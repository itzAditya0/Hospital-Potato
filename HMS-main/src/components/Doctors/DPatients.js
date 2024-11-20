import React, { useState, useEffect } from "react";
import { FaSearch, FaList, FaTh, FaTimes } from "react-icons/fa";
import api from "../../api";
import "./styles/DPatients.css";

function PatientPage() {
  const [viewMode, setViewMode] = useState("table");
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await api.get("/patients");
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    fetchPatients();
  }, []);

  useEffect(() => {
    const filtered = patients.filter((patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredPatients(filtered);
  }, [searchTerm, dateFilter, patients]);

  const handleViewHistory = (patient) => {
    setSelectedPatient(patient);
    setShowHistory(true);
  };

  const handleFileUpload = async (e, patientId) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("prescription", file);

    try {
      await api.post(`/patients/${patientId}/upload-prescription`, formData);
      alert("Prescription uploaded successfully.");
    } catch (error) {
      console.error("Error uploading prescription:", error);
      alert("Failed to upload prescription.");
    }
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
            placeholder="Search by patient name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
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
                <td onClick={() => handleViewHistory(patient)}>
                  {patient.name}
                </td>
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
                    onChange={(e) => handleFileUpload(e, patient.id)}
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
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => handleFileUpload(e, patient.id)}
                />
                {patient.prescription && (
                  <span>Uploaded: {patient.prescription.name}</span>
                )}
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
            <p>
              <strong>Date Added:</strong> {selectedPatient.date}
            </p>
            <p>
              <strong>Medical History:</strong> {selectedPatient.history}
            </p>
            {selectedPatient.prescription && (
              <p>
                <strong>Prescription:</strong>{" "}
                {selectedPatient.prescription.name}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientPage;
