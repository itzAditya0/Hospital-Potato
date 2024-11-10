import React, { useState } from "react";
import "./Styles/PDoctors.css";

// Utility function to generate time slots from 10 AM to 6 PM with 30-minute intervals
const generateTimeSlots = (startHour, endHour) => {
  const slots = [];
  for (let hour = startHour; hour <= endHour; hour++) {
    const hourFormatted = hour > 12 ? hour - 12 : hour;
    const ampm = hour >= 12 ? "PM" : "AM";
    slots.push(`${hourFormatted}:00 ${ampm}`);
    if (hour !== endHour) {
      slots.push(`${hourFormatted}:30 ${ampm}`);
    }
  }
  return slots;
};

// Updated doctors data with dynamically generated slots
const doctorsData = [
  {
    id: 1,
    name: "Dr. John Doe",
    specialization: "Cardiology",
    degree: "MD, Cardiology",
    approved: false,
    slots: generateTimeSlots(10, 18),
  },
  {
    id: 2,
    name: "Dr. Sarah Lee",
    specialization: "Neurology",
    degree: "MD, Neurology",
    approved: false,
    slots: generateTimeSlots(10, 18),
  },
  {
    id: 3,
    name: "Dr. Emily Brown",
    specialization: "Pediatrics",
    degree: "MD, Pediatrics",
    approved: false,
    slots: generateTimeSlots(10, 18),
  },
  {
    id: 4,
    name: "Dr. Michael Smith",
    specialization: "Orthopedics",
    degree: "MD, Orthopedics",
    approved: false,
    slots: generateTimeSlots(10, 18),
  },
  {
    id: 5,
    name: "Dr. Laura Johnson",
    specialization: "Dermatology",
    degree: "MD, Dermatology",
    approved: false,
    slots: generateTimeSlots(10, 18),
  },
];

const DoctorsPage = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState("All"); // Default to show all departments
  const [selectedDate, setSelectedDate] = useState(""); // Default to no date selected
  const [bookedSlots, setBookedSlots] = useState({}); // Track booked slots for each doctor
  const [slotToConfirm, setSlotToConfirm] = useState(null); // Slot confirmation state

  // Get unique departments from doctors data
  const departments = [
    "All",
    ...new Set(doctorsData.map((doctor) => doctor.specialization)),
  ];

  // Handle department filter change
  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
  };

  // Handle date filter change
  const handleDateChange = (e) => {
    const today = new Date();
    const selectedOption = e.target.value;

    if (selectedOption === "today") {
      setSelectedDate(today);
    } else if (selectedOption === "tomorrow") {
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      setSelectedDate(tomorrow);
    } else if (selectedOption === "custom") {
      setSelectedDate(""); // Allow selection of a custom date
    }
  };

  // Handle custom date selection
  const handleCustomDateChange = (e) => {
    const customDate = new Date(e.target.value);
    const today = new Date();
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 5);

    if (customDate > maxDate) {
      alert("Appointment can only be booked within the next 5 days.");
      setSelectedDate("");
    } else {
      setSelectedDate(customDate);
    }
  };

  // Filter doctors based on selected department and availability on selected date
  const filteredDoctors =
    selectedDepartment === "All"
      ? doctorsData
      : doctorsData.filter(
          (doctor) => doctor.specialization === selectedDepartment
        );

  // When viewing the profile, set the selected doctor to show the modal
  const viewProfile = (doctor) => {
    setSelectedDoctor(doctor);
  };

  // Close the modal when the user clicks "Close"
  const closeModal = () => {
    setSelectedDoctor(null);
  };

  // Handle slot selection, trigger confirmation
  const handleSlotSelection = (doctorId, slot) => {
    setSlotToConfirm({ doctorId, slot });
  };

  // Confirm booking of the slot
  const confirmBooking = () => {
    setBookedSlots((prev) => ({
      ...prev,
      [slotToConfirm.doctorId]: slotToConfirm.slot, // Set the booked slot for the doctor
    }));
    setSlotToConfirm(null); // Close confirmation modal
  };

  // Cancel slot booking
  const cancelBooking = () => {
    setSlotToConfirm(null); // Close confirmation modal
  };

  return (
    <div className="doctors-content">
      <h2>Doctors</h2>

      {/* Department Filter */}
      <div className="filter-section">
        <label htmlFor="department-filter">Filter by Department: </label>
        <select
          id="department-filter"
          value={selectedDepartment}
          onChange={handleDepartmentChange}
        >
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        {/* Date Filter */}
        <label htmlFor="date-filter">Filter by Date: </label>
        <select id="date-filter" onChange={handleDateChange}>
          <option value="today">Today</option>
          <option value="tomorrow">Tomorrow</option>
          <option value="custom">Custom Date</option>
        </select>

        {/* Custom Date Input */}
        {selectedDate === "" && (
          <input
            type="date"
            onChange={handleCustomDateChange}
            className="custom-date-input"
          />
        )}
      </div>

      <table>
        <thead>
          <tr>
            <th>Doctor Name</th>
            <th>Specialization</th>
            <th>Available Slots</th>
            <th>View Profile</th>
          </tr>
        </thead>
        <tbody>
          {filteredDoctors.map((doctor) => (
            <tr key={doctor.id}>
              <td>{doctor.name}</td>
              <td>{doctor.specialization}</td>
              <td>
                <select
                  onChange={(e) =>
                    handleSlotSelection(doctor.id, e.target.value)
                  }
                  value={bookedSlots[doctor.id] || ""} // Show booked slot if available
                >
                  <option value="" disabled>
                    Select Slot
                  </option>
                  {doctor.slots.map((slot, index) => (
                    <option key={index} value={slot}>
                      {slot} {bookedSlots[doctor.id] === slot && "(Booked)"}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <button
                  className="btn-view"
                  onClick={() => viewProfile(doctor)}
                >
                  View Profile
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal to show doctor's profile */}
      {selectedDoctor && (
        <div className="modal">
          <div className="modal-content">
            <h3>{selectedDoctor.name}'s Profile</h3>
            <p>
              <strong>Specialization:</strong> {selectedDoctor.specialization}
            </p>
            <p>
              <strong>Degree:</strong> {selectedDoctor.degree}
            </p>{" "}
            {/* Display doctor's degree */}
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {slotToConfirm && (
        <div className="modal">
          <div className="modal-content">
            <h3>Confirm Slot Booking</h3>
            <p>
              Do you want to book the slot <strong>{slotToConfirm.slot}</strong>{" "}
              for the doctor?
            </p>
            <div className="modal-buttons">
              <button onClick={confirmBooking} className="btn-confirm">
                Confirm
              </button>
              <button onClick={cancelBooking} className="btn-cancel">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorsPage;
