// src/Doctor/DoctorProfile.js
import React, { useEffect, useState } from "react";
import api from "../../api";
import "./styles/DoctorProfile.css";

const DoctorProfile = () => {
  const [doctor, setDoctor] = useState({
    name: "",
    specialty: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const fetchDoctorProfile = async () => {
      try {
        const response = await api.get("/doctors/profile");
        setDoctor(response.data);
      } catch (error) {
        console.error("Error fetching doctor profile:", error);
      }
    };
    fetchDoctorProfile();
  }, []);

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
