import React, { useState, useMemo } from "react";
import "./Styles/Dashboard.css";
import { FaFilter } from "react-icons/fa";

const appointments = [
  {
    date: "2023-12-10",
    name: "Doctor Appointment",
    time: "10:00 AM",
    doctor: "Dr. John Doe",
  },
  {
    date: "2023-12-20",
    name: "Checkup",
    time: "02:00 PM",
    doctor: "Dr. Jane Smith",
  },
  {
    date: "2024-01-05",
    name: "Follow-up",
    time: "11:30 AM",
    doctor: "Dr. John Doe",
  },
  {
    date: "2023-09-20",
    name: "Past Checkup",
    time: "09:30 AM",
    doctor: "Dr. John Doe",
  },
  {
    date: "2024-02-15",
    name: "Dental Cleaning",
    time: "09:00 AM",
    doctor: "Dr. Emily Clark",
  },
];

function PDashboard() {
  const [filter, setFilter] = useState("day");
  const [prescriptionPopup, setPrescriptionPopup] = useState(false);
  const [patientListPopup, setPatientListPopup] = useState(false);
  const [doctorListPopup, setDoctorListPopup] = useState(false);
  const [labResultsPopup, setLabResultsPopup] = useState(false);
  const [upcomingTestsPopup, setUpcomingTestsPopup] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  const filterAppointments = useMemo(() => {
    const now = new Date();
    switch (filter) {
      case "day":
        return appointments.filter((app) => app.date === today);
      case "week":
        const startOfWeek = new Date();
        startOfWeek.setDate(now.getDate() - now.getDay());
        return appointments.filter(
          (app) =>
            new Date(app.date) >= startOfWeek && new Date(app.date) <= now
        );
      case "month":
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        return appointments.filter(
          (app) =>
            new Date(app.date) >= startOfMonth && new Date(app.date) <= now
        );
      default:
        return appointments;
    }
  }, [filter]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setDropdownOpen(false);
  };

  return (
    <div className="dashboard-container">
      {/* Appointments Section */}
      <div className="appointments-section card">
        <h2>Appointments</h2>
        <div className="filters-container">
          <button
            className="filters-button"
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <FaFilter /> Filter by <span className="arrow-down">&#9662;</span>
          </button>
          {dropdownOpen && (
            <div className="dropdown-content">
              <button onClick={() => handleFilterChange("day")}>Day</button>
              <button onClick={() => handleFilterChange("week")}>Week</button>
              <button onClick={() => handleFilterChange("month")}>Month</button>
            </div>
          )}
        </div>
        <div className="appointment-table">
          {filterAppointments.length > 0 ? (
            <table className="modern-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Doctor</th>
                  <th>Purpose</th>
                </tr>
              </thead>
              <tbody>
                {filterAppointments.map((appointment, index) => (
                  <tr key={index}>
                    <td>{new Date(appointment.date).toDateString()}</td>
                    <td>{appointment.time}</td>
                    <td>{appointment.doctor}</td>
                    <td>{appointment.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-appointments-message">
              No appointments found for the selected filter.
            </p>
          )}
        </div>
      </div>

      {/* Prescription Section */}
      <div className="prescription-section card">
        <h2>Latest Prescription</h2>
        <button
          className="view-prescription-btn"
          onClick={() => setPrescriptionPopup(true)}
          aria-label="View Prescription"
        >
          View Prescription
        </button>
      </div>

      {/* Patient List Section */}
      <div className="patient-list-section card">
        <h2>Patient List</h2>
        <button
          className="view-patient-list-btn"
          onClick={() => setPatientListPopup(true)}
          aria-label="View Patient List"
        >
          View Patient List
        </button>
      </div>

      {/* Doctor List Section */}
      <div className="doctor-list-section card">
        <h2>Doctor List</h2>
        <button
          className="view-doctor-list-btn"
          onClick={() => setDoctorListPopup(true)}
          aria-label="View Doctor List"
        >
          View Doctor List
        </button>
      </div>

      {/* Lab Results Section */}
      <div className="lab-results-section card">
        <h2>Lab Results</h2>
        <button
          className="view-lab-results-btn"
          onClick={() => setLabResultsPopup(true)}
          aria-label="View Lab Results"
        >
          View Lab Results
        </button>
      </div>

      {/* Upcoming Tests Section */}
      <div className="upcoming-tests-section card">
        <h2>Upcoming Tests</h2>
        <button
          className="view-upcoming-tests-btn"
          onClick={() => setUpcomingTestsPopup(true)}
          aria-label="View Upcoming Tests"
        >
          View Upcoming Tests
        </button>
      </div>

      {/* Popups for each section */}
      {prescriptionPopup && (
        <div className="popup-overlay active" onClick={() => setPrescriptionPopup(false)}>
          <div className="popup-content">
            <h3>Prescription Details</h3>
            <button onClick={() => setPrescriptionPopup(false)} className="close-btn">X</button>
          </div>
        </div>
      )}

      {patientListPopup && (
        <div className="popup-overlay active" onClick={() => setPatientListPopup(false)}>
          <div className="popup-content">
            <h3>Patient List</h3>
            <ul>
              <li>John Smith</li>
              <li>Jane Doe</li>
              <li>Emily Clark</li>
              <li>Michael Johnson</li>
            </ul>
            <button onClick={() => setPatientListPopup(false)} className="close-btn">X</button>
          </div>
        </div>
      )}

      {doctorListPopup && (
        <div className="popup-overlay active" onClick={() => setDoctorListPopup(false)}>
          <div className="popup-content">
            <h3>Doctor List</h3>
            <ul>
              <li>Dr. John Doe</li>
              <li>Dr. Jane Smith</li>
              <li>Dr. Emily Clark</li>
              <li>Dr. Michael Scott</li>
            </ul>
            <button onClick={() => setDoctorListPopup(false)} className="close-btn">X</button>
          </div>
        </div>
      )}

      {labResultsPopup && (
        <div className="popup-overlay active" onClick={() => setLabResultsPopup(false)}>
          <div className="popup-content">
            <h3>Lab Results</h3>
            <ul>
              <li>Blood Test: Normal</li>
              <li>X-Ray: Clear</li>
              <li>Urine Test: Normal</li>
            </ul>
            <button onClick={() => setLabResultsPopup(false)} className="close-btn">X</button>
          </div>
        </div>
      )}

      {upcomingTestsPopup && (
        <div className="popup-overlay active" onClick={() => setUpcomingTestsPopup(false)}>
          <div className="popup-content">
            <h3>Upcoming Tests</h3>
            <ul>
              <li>Blood Test on 2023-12-12</li>
              <li>Ultrasound on 2023-12-15</li>
            </ul>
            <button onClick={() => setUpcomingTestsPopup(false)} className="close-btn">X</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PDashboard;
