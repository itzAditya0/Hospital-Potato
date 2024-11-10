import React, { useState, useMemo, useEffect } from "react";
import "./Styles/PDashboard.css";
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
  const [filter, setFilter] = useState("upcoming");
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [prescriptionPopup, setPrescriptionPopup] = useState(false);
  const [billPopup, setBillPopup] = useState(false);
  const [profilePopup, setProfilePopup] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  const filterAppointments = useMemo(() => {
    const now = new Date();
    switch (filter) {
      case "week":
        return appointments.filter(
          (app) =>
            new Date(app.date) >= new Date(now.setDate(now.getDate() - 7)) &&
            new Date(app.date) <= new Date()
        );
      case "month":
        return appointments.filter(
          (app) =>
            new Date(app.date) >= new Date(now.setMonth(now.getMonth() - 1)) &&
            new Date(app.date) <= new Date()
        );
      case "custom":
        if (!customStartDate || !customEndDate) return [];
        return appointments.filter(
          (app) =>
            new Date(app.date) >= new Date(customStartDate) &&
            new Date(app.date) <= new Date(customEndDate)
        );
      case "upcoming":
      default:
        return appointments.filter((app) => new Date(app.date) >= new Date());
    }
  }, [filter, customStartDate, customEndDate]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCustomStartDate("");
    setCustomEndDate("");
    setDropdownOpen(false);
  };

  const handleAppointmentClick = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const handleOverlayClick = (e) => {
    e.stopPropagation(); // Prevents popup from closing when clicking inside
  };

  useEffect(() => {
    // Close dropdown if clicking outside
    const handleOutsideClick = () => setDropdownOpen(false);
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <div className="dashboard-container">
      <div className="appointments-section card">
        <h2>My Appointments</h2>
        <div className="filters-container">
          <div className="filters-dropdown">
            <button
              className="filters-button"
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
              onClick={(e) => {
                e.stopPropagation();
                setDropdownOpen(!dropdownOpen);
              }}
            >
              <FaFilter /> Filter by <span className="arrow-down">&#9662;</span>
            </button>
            {dropdownOpen && (
              <div className="dropdown-content">
                <button onClick={() => handleFilterChange("upcoming")}>
                  Upcoming
                </button>
                <button onClick={() => handleFilterChange("week")}>
                  Past Week
                </button>
                <button onClick={() => handleFilterChange("month")}>
                  Past Month
                </button>
                <button onClick={() => handleFilterChange("custom")}>
                  Custom
                </button>
              </div>
            )}
          </div>
        </div>

        {filter === "custom" && (
          <div className="custom-date-filter">
            <label>
              Start Date:
              <input
                type="date"
                value={customStartDate}
                onChange={(e) => setCustomStartDate(e.target.value)}
                aria-label="Start Date"
              />
            </label>
            <label>
              End Date:
              <input
                type="date"
                value={customEndDate}
                onChange={(e) => setCustomEndDate(e.target.value)}
                aria-label="End Date"
              />
            </label>
          </div>
        )}

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
                  <tr
                    key={index}
                    className={appointment.date === today ? "today" : ""}
                    onClick={() => handleAppointmentClick(appointment)}
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) =>
                      e.key === "Enter" && handleAppointmentClick(appointment)
                    }
                  >
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

      {/* Prescription Modal */}
      {prescriptionPopup && (
        <div
          className="popup-overlay active"
          onClick={() => setPrescriptionPopup(false)}
        >
          <div className="popup-content" onClick={handleOverlayClick}>
            <h3>Prescription Details</h3>
            <p>
              <strong>Doctor:</strong> Dr. John Doe
            </p>
            <p>
              <strong>Date:</strong> 23rd September 2024
            </p>
            <p>Medicine: Paracetamol, twice daily</p>
            <button
              onClick={() => setPrescriptionPopup(false)}
              className="close-btn"
            >
              X
            </button>
          </div>
        </div>
      )}

      {/* Billing Section */}
      <div className="billing-section card">
        <h2>Billing Information</h2>
        <button
          className="view-bill-btn"
          onClick={() => setBillPopup(true)}
          aria-label="View Bill Details"
        >
          View Bill Details
        </button>
      </div>

      {/* Billing Modal */}
      {billPopup && (
        <div
          className="popup-overlay active"
          onClick={() => setBillPopup(false)}
        >
          <div className="popup-content" onClick={handleOverlayClick}>
            <h3>Bill Details</h3>
            <p>
              <strong>Date:</strong> 15th September 2024
            </p>
            <p>
              <strong>Amount Due:</strong> $150
            </p>
            <p>Breakdown: Consultation $100, Medicine $50</p>
            <button onClick={() => setBillPopup(false)} className="close-btn">
              X
            </button>
          </div>
        </div>
      )}

      {/* Patient Info Section */}
      <div className="patient-info-section card">
        <h2>Patient Information</h2>
        <button
          className="view-details-btn"
          onClick={() => setProfilePopup(true)}
          aria-label="View Full Profile"
        >
          View Full Profile
        </button>
      </div>

      {/* Patient Profile Modal */}
      {profilePopup && (
        <div
          className="popup-overlay active"
          onClick={() => setProfilePopup(false)}
        >
          <div className="popup-content" onClick={handleOverlayClick}>
            <h3>Patient Profile</h3>
            <p>
              <strong>Name:</strong> John Smith
            </p>
            <p>
              <strong>Age:</strong> 45
            </p>
            <p>
              <strong>Diagnosis:</strong> Hypertension
            </p>
            <button
              onClick={() => setProfilePopup(false)}
              className="close-btn"
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PDashboard;
