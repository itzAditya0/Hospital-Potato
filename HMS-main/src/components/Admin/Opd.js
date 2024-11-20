import React, { useState, useEffect, useRef } from "react";
import {
  FaUserMd,
  FaClock,
  FaHospitalUser,
  FaListUl,
  FaTh,
  FaTable,
} from "react-icons/fa";
import api from "../../api"; // Import Axios instance for backend calls
import "./Styles/Opd.css";

const Opd = () => {
  const [viewMode, setViewMode] = useState("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctorsOnDuty, setDoctorsOnDuty] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchDoctorsOnDuty = async () => {
      try {
        const response = await api.get("/opd/doctors");
        setDoctorsOnDuty(response.data);
      } catch (error) {
        console.error("Error fetching doctors on duty:", error);
      }
    };
    fetchDoctorsOnDuty();
  }, []);

  const uniqueSpecialties = [
    "All",
    ...new Set(doctorsOnDuty.map((doctor) => doctor.specialty)),
  ];

  const toggleFilterDropdown = () => {
    setIsFilterDropdownOpen((prev) => !prev);
  };

  const handleSpecialtyFilterChange = (specialty) => {
    setSelectedSpecialty(specialty);
    setIsFilterDropdownOpen(false);
  };

  const switchToTableView = () => setViewMode("table");
  const switchToCardView = () => setViewMode("card");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsFilterDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredDoctors = doctorsOnDuty.filter((doctor) => {
    const matchesSearch = doctor.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesSpecialty =
      selectedSpecialty === "All" || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const openPatientListModal = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const closePatientListModal = () => {
    setSelectedDoctor(null);
  };

  return (
    <div className="opd-container">
      <h2>Outpatient Department (OPD)</h2>

      {/* Filter and Search Section */}
      <div className="filter-search-section">
        <input
          type="text"
          placeholder="Search by doctor name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />

        {/* Filter Dropdown */}
        <div className="filter-dropdown" ref={dropdownRef}>
          <button className="filter-btn" onClick={toggleFilterDropdown}>
            Filter by Department ▼
          </button>
          {isFilterDropdownOpen && (
            <div className="dropdown-menu">
              {uniqueSpecialties.map((specialty, index) => (
                <button
                  key={index}
                  onClick={() => handleSpecialtyFilterChange(specialty)}
                >
                  {specialty}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* View Buttons */}
      <div className="view-buttons">
        <button
          onClick={switchToTableView}
          className={`view-btn ${viewMode === "table" ? "active" : ""}`}
        >
          <FaTable /> Table View
        </button>
        <button
          onClick={switchToCardView}
          className={`view-btn ${viewMode === "card" ? "active" : ""}`}
        >
          <FaTh /> Card View
        </button>
      </div>

      {/* Display Content based on view mode */}
      {viewMode === "table" ? (
        <table className="opd-table">
          <thead>
            <tr>
              <th>Doctor Name</th>
              <th>Specialty</th>
              <th>Duty Time</th>
              <th>Patients</th>
            </tr>
          </thead>
          <tbody>
            {filteredDoctors.map((doctor) => (
              <tr key={doctor.id}>
                <td>{doctor.name}</td>
                <td>{doctor.specialty}</td>
                <td>{doctor.dutyTime}</td>
                <td>
                  <button
                    onClick={() => openPatientListModal(doctor)}
                    className="view-patient-btn"
                  >
                    <FaListUl /> View Patients
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="doctor-card-container">
          {filteredDoctors.map((doctor) => (
            <div className="doctor-card" key={doctor.id}>
              <h3>
                <FaUserMd /> {doctor.name}
              </h3>
              <p className="specialty">
                <FaHospitalUser /> {doctor.specialty}
              </p>
              <p className="duty-time">
                <FaClock /> Duty Time: {doctor.dutyTime}
              </p>
              <button
                onClick={() => openPatientListModal(doctor)}
                className="view-patient-btn"
              >
                <FaListUl /> View Patients
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Patient List Modal */}
      {selectedDoctor && (
        <div className="modal-overlay" onClick={closePatientListModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Patients for {selectedDoctor.name}</h3>
            <table className="patient-table">
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Appointment Time</th>
                </tr>
              </thead>
              <tbody>
                {selectedDoctor.patients.map((patient) => (
                  <tr key={patient.id}>
                    <td>{patient.name}</td>
                    <td>{patient.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Opd;
