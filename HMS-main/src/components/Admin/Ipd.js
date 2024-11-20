import React, { useState, useEffect } from "react";
import api from "../../api"; // Import Axios instance for backend calls
import "./Styles/Ipd.css";

const Ipd = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [filteredNurses, setFilteredNurses] = useState([]);
  const [filteredCleaningStaff, setFilteredCleaningStaff] = useState([]);

  // Fetch data based on the selected date
  const fetchStaffData = async (date) => {
    try {
      const response = await api.get(`/staff/schedule?date=${date}`);
      const { doctors, nurses, cleaningStaff } = response.data;

      setFilteredDoctors(doctors);
      setFilteredNurses(nurses);
      setFilteredCleaningStaff(cleaningStaff);
    } catch (error) {
      console.error("Error fetching staff data:", error);
    }
  };

  const handleDateChange = (event) => {
    const date = event.target.value;
    setSelectedDate(date);

    if (date) {
      fetchStaffData(date);
    } else {
      clearFilter();
    }
  };

  const clearFilter = () => {
    setSelectedDate("");
    setFilteredDoctors([]);
    setFilteredNurses([]);
    setFilteredCleaningStaff([]);
  };

  return (
    <div className="opd-container">
      <h2>In-Patient Department (IPD) - Staff on Duty</h2>
      <div className="filter-container">
        <div className="filter-controls">
          <label htmlFor="date">Select Date:</label>
          <input
            type="date"
            id="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="date-input"
          />
          <button onClick={clearFilter} className="clear-btn">
            Clear Filter
          </button>
        </div>
      </div>

      <h3>Doctors on Duty</h3>
      <ul>
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor, index) => (
            <li
              key={index}
              className={
                doctor.role === "Emergency Doctor"
                  ? "emergency-doctor"
                  : "general-doctor"
              }
            >
              {doctor.name} - {doctor.role} - {doctor.shift} - {doctor.date}
            </li>
          ))
        ) : (
          <p>No doctors scheduled for this date.</p>
        )}
      </ul>

      <h3>Nurses on Duty</h3>
      <ul>
        {filteredNurses.length > 0 ? (
          filteredNurses.map((nurse, index) => (
            <li key={index} className="nurse">
              {nurse.name} - {nurse.shift} - {nurse.date}
            </li>
          ))
        ) : (
          <p>No nurses scheduled for this date.</p>
        )}
      </ul>

      <h3>Cleaning Staff on Duty</h3>
      <ul>
        {filteredCleaningStaff.length > 0 ? (
          filteredCleaningStaff.map((cleaner, index) => (
            <li key={index} className="cleaning-staff">
              {cleaner.name} - {cleaner.shift} - {cleaner.date}
            </li>
          ))
        ) : (
          <p>No cleaning staff scheduled for this date.</p>
        )}
      </ul>
    </div>
  );
};

export default Ipd;
