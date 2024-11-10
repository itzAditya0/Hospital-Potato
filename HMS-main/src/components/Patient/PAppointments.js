import React, { useState } from "react";
import "./Styles/PAppointments.css"; // CSS specific to appointments page

const Appointments = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctorName: "Elizabeth Polson",
      department: "General",
      time: "9:30 AM",
      date: "2022-12-05",
      status: "Completed",
    },
    {
      id: 2,
      doctorName: "John David",
      department: "General",
      time: "10:00 AM",
      date: "2022-12-05",
      status: "Pending",
    },
    {
      id: 3,
      doctorName: "Sumanth Tinson",
      department: "General",
      time: "11:30 AM",
      date: "2022-12-05",
      status: "Pending",
    },
    {
      id: 4,
      doctorName: "Laura Smith",
      department: "Cardiology",
      time: "02:00 PM",
      date: "2022-12-06",
      status: "Completed",
    },
    {
      id: 5,
      doctorName: "David Green",
      department: "Neurology",
      time: "03:00 PM",
      date: "2022-12-07",
      status: "Pending",
    },
  ]);

  const [isRescheduleModalOpen, setRescheduleModalOpen] = useState(false);
  const [rescheduleId, setRescheduleId] = useState(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const openRescheduleModal = (id) => {
    setRescheduleId(id);
    setRescheduleModalOpen(true);
  };

  const closeRescheduleModal = () => {
    setRescheduleModalOpen(false);
    setRescheduleId(null);
    setNewDate("");
    setNewTime("");
  };

  const handleReschedule = () => {
    setAppointments(
      appointments.map((appt) =>
        appt.id === rescheduleId
          ? { ...appt, date: newDate, time: newTime }
          : appt
      )
    );
    closeRescheduleModal();
  };

  const filteredAppointments = filterDate
    ? appointments.filter((appointment) => appointment.date === filterDate)
    : appointments;

  return (
    <div className="appointments-content">
      <h2>Appointments</h2>

      {/* Date Filter */}
      <div className="filter-container">
        <label htmlFor="filter-date">Filter by Date:</label>
        <input
          type="date"
          id="filter-date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
        <button onClick={() => setFilterDate("")} className="clear-filter-btn">
          Clear Filter
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Date</th>
            <th>Doctor Name</th>
            <th>Department</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.time}</td>
                <td>{new Date(appointment.date).toLocaleDateString()}</td>
                <td>{appointment.doctorName}</td>
                <td>{appointment.department}</td>
                <td>
                  <span
                    className={
                      appointment.status === "Completed"
                        ? "completed"
                        : "pending"
                    }
                  >
                    {appointment.status}
                  </span>
                </td>
                <td>
                  <button
                    className="btn-reschedule"
                    onClick={() => openRescheduleModal(appointment.id)}
                    disabled={appointment.status === "Completed"}
                  >
                    Reschedule
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="no-appointments-message">
                No appointments found for the selected date.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {isRescheduleModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Reschedule Appointment</h3>
            <div>
              <label>New Date: </label>
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
              />
            </div>
            <div>
              <label>New Time: </label>
              <input
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
              />
            </div>
            <button onClick={handleReschedule} className="save-btn">
              Save
            </button>
            <button onClick={closeRescheduleModal} className="cancel-btn">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
