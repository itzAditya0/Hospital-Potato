// src/components/Patient/PDoctors.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import "./Styles/PDoctors.css";

const PDoctors = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await api.get("/api/doctors");
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <div className="doctors-page">
      <h2>Available Doctors</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Specialization</th>
            <th>Book Appointment</th>
          </tr>
        </thead>
        <tbody>
          {doctors.length > 0 ? (
            doctors.map((doctor) => (
              <tr key={doctor._id}>
                <td>{doctor.name}</td>
                <td>{doctor.specialization}</td>
                <td>
                  <Link
                    to={`/patient/book-appointment/${doctor._id}`}
                    className="btn-book"
                  >
                    Book
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No doctors available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PDoctors;
