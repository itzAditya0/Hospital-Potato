// src/components/Doctors/DAppointment.js
import React, { useState, useEffect, useMemo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "../../api";
import "./styles/DAppointment.css";

const DAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState("all");
  const [customStartDate, setCustomStartDate] = useState(null);
  const [customEndDate, setCustomEndDate] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.put(`/appointments/${id}/status`, { status: newStatus });
      setAppointments(
        appointments.map((appointment) =>
          appointment.id === id
            ? { ...appointment, status: newStatus }
            : appointment,
        ),
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const filterAppointments = useMemo(() => {
    const now = new Date();
    return appointments.filter((appointment) => {
      const matchesSearch = appointment.patientName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      if (filter === "today") {
        return (
          matchesSearch &&
          appointment.date.toDateString() === now.toDateString()
        );
      } else if (filter === "week") {
        const weekFromNow = new Date(now);
        weekFromNow.setDate(now.getDate() + 7);
        return (
          matchesSearch &&
          appointment.date >= now &&
          appointment.date <= weekFromNow
        );
      } else if (filter === "month") {
        const monthFromNow = new Date(now);
        monthFromNow.setMonth(now.getMonth() + 1);
        return (
          matchesSearch &&
          appointment.date >= now &&
          appointment.date <= monthFromNow
        );
      } else if (filter === "custom" && customStartDate && customEndDate) {
        return (
          matchesSearch &&
          appointment.date >= customStartDate &&
          appointment.date <= customEndDate
        );
      }
      return matchesSearch;
    });
  }, [appointments, filter, customStartDate, customEndDate, searchQuery]);

  return (
    <div className="dappointment-container">
      <h3>Appointments</h3>

      <div className="filter-search-container">
        <input
          type="text"
          placeholder=" 🔍 Search by patient name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <div className="custom-select-container">
          <select
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
            className="filter-select"
          >
            <option value="all">Filter by 🔽</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>
        {filter === "custom" && (
          <div className="date-picker-container">
            <DatePicker
              selected={customStartDate}
              onChange={(date) => setCustomStartDate(date)}
              selectsStart
              startDate={customStartDate}
              endDate={customEndDate}
              placeholderText="Start Date"
            />
            <DatePicker
              selected={customEndDate}
              onChange={(date) => setCustomEndDate(date)}
              selectsEnd
              startDate={customStartDate}
              endDate={customEndDate}
              placeholderText="End Date"
            />
          </div>
        )}
      </div>

      <table className="appointments-table">
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Time</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filterAppointments.map((appointment) => (
            <tr
              key={appointment.id}
              onClick={() => setSelectedAppointment(appointment)}
            >
              <td>{appointment.patientName}</td>
              <td>{appointment.time}</td>
              <td className={`status-${appointment.status.toLowerCase()}`}>
                {appointment.status}
              </td>
              <td>
                <select
                  value={appointment.status}
                  onChange={(e) =>
                    handleStatusChange(appointment.id, e.target.value)
                  }
                >
                  <option value="Confirmed">Confirmed</option>
                  <option value="Pending">Pending</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedAppointment && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedAppointment(null)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h4>Appointment Details</h4>
            <p>
              <strong>Patient Name:</strong> {selectedAppointment.patientName}
            </p>
            <p>
              <strong>Appointment Time:</strong> {selectedAppointment.time}
            </p>
            <p>
              <strong>Status:</strong> {selectedAppointment.status}
            </p>
            <p>
              <strong>Date:</strong> {selectedAppointment.date.toDateString()}
            </p>
            <button
              onClick={() => setSelectedAppointment(null)}
              className="close-details-btn"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DAppointment;
