import React, { useState, useEffect } from "react";
import api from "../../api"; // Import Axios instance
import "./Styles/Appointments.css";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [viewType, setViewType] = useState("upcoming");
  const [filters, setFilters] = useState({ name: "", dateRange: "all" });
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const today = new Date();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await api.get("/appointments");
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    fetchAppointments();
  }, []);

  const upcomingAppointments = appointments.filter(
    (appt) => new Date(appt.date) > today,
  );
  const previousAppointments = appointments.filter(
    (appt) => new Date(appt.date) < today,
  );

  const handleViewChange = (view) => {
    setViewType(view);
    setFilters((prev) => ({ ...prev, dateRange: "all" }));
  };

  const handleSearchChange = (e) => {
    setFilters({ ...filters, name: e.target.value });
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleDateRangeChange = (range) => {
    setFilters({ ...filters, dateRange: range });
    setDropdownOpen(false);
  };

  const getDateFilteredAppointments = (appointmentsList) => {
    const filteredAppointments = appointmentsList.filter((appt) =>
      appt.patientName.toLowerCase().includes(filters.name.toLowerCase()),
    );

    switch (filters.dateRange) {
      case "today":
        return filteredAppointments.filter(
          (appt) => new Date(appt.date).toDateString() === today.toDateString(),
        );
      case "week":
        return filteredAppointments.filter(
          (appt) =>
            new Date(appt.date) > new Date(today.setDate(today.getDate() - 7)),
        );
      case "month":
        return filteredAppointments.filter(
          (appt) => new Date(appt.date).getMonth() === today.getMonth(),
        );
      default:
        return filteredAppointments;
    }
  };

  const displayedAppointments =
    viewType === "upcoming" ? upcomingAppointments : previousAppointments;
  const filteredAppointments = getDateFilteredAppointments(
    displayedAppointments,
  );

  const handleStatusUpdate = async (appointmentId, newStatus) => {
    try {
      await api.put(`/appointments/${appointmentId}/status`, {
        status: newStatus,
      });
      setAppointments((prevAppointments) =>
        prevAppointments.map((appt) =>
          appt.id === appointmentId ? { ...appt, status: newStatus } : appt,
        ),
      );
    } catch (error) {
      console.error("Error updating appointment status:", error);
    }
  };

  return (
    <div className="appointments-content">
      <div className="appointments-header">
        <h2>Appointments</h2>
        <div className="view-toggle-buttons">
          <button
            onClick={() => handleViewChange("upcoming")}
            className={`view-button-appointment ${viewType === "upcoming" ? "active" : ""}`}
          >
            Upcoming Appointments
          </button>
          <button
            onClick={() => handleViewChange("previous")}
            className={`view-button-previous${viewType === "previous" ? "active" : ""}`}
          >
            Previous Appointments
          </button>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="search-filter">
        <input
          type="text"
          placeholder="Search by Patient Name"
          value={filters.name}
          onChange={handleSearchChange}
          className="search-bar"
        />
        <div className="filter-container">
          <button onClick={toggleDropdown} className="filter-button">
            Filter by
          </button>
          {isDropdownOpen && (
            <div className="filter-dropdown">
              {viewType === "upcoming" ? (
                <>
                  <button onClick={() => handleDateRangeChange("today")}>
                    Today
                  </button>
                  <button onClick={() => handleDateRangeChange("week")}>
                    Next Week
                  </button>
                  <button onClick={() => handleDateRangeChange("month")}>
                    Next Month
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => handleDateRangeChange("today")}>
                    Today
                  </button>
                  <button onClick={() => handleDateRangeChange("week")}>
                    Past Week
                  </button>
                  <button onClick={() => handleDateRangeChange("month")}>
                    Past Month
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <table className="appointments__table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Date</th>
            <th>Patient Name</th>
            <th>Doctor</th>
            <th>Department</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAppointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.time}</td>
              <td>{appointment.date}</td>
              <td>{appointment.patientName}</td>
              <td>{appointment.doctor}</td>
              <td>{appointment.department}</td>
              <td>
                <span
                  className={`appointments__status appointments__status--${appointment.status.toLowerCase()}`}
                >
                  {appointment.status}
                </span>
              </td>
              <td>
                <button
                  className="button--status-toggle"
                  onClick={() =>
                    handleStatusUpdate(appointment.id, "Completed")
                  }
                >
                  Mark Completed
                </button>
                <button className="button--reschedule">Reschedule</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Appointments;
