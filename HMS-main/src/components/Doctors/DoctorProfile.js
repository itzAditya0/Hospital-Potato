// src/Doctor/DoctorProfile.js
import React from "react";
import "./styles/DoctorProfile.css";

const DoctorProfile = ({ doctor }) => {
    return (
        <div className="doctor-profile-container">
            <h3>{doctor.name}</h3>
            <p>
                <strong>Specialty:</strong> {doctor.specialty}
            </p>
            <p>
                <strong>Email:</strong> {doctor.email}
            </p>
            <p>
                <strong>Phone:</strong> {doctor.phone}
            </p>
        </div>
    );
};

export default DoctorProfile;
