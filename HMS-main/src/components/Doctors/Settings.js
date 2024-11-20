// src/Doctor/Settings.js
import React, { useEffect, useState } from "react";
import api from "../../api";
import "./styles/Settings.css";

function Settings() {
  const [doctorName, setDoctorName] = useState("");
  const [specializations, setSpecializations] = useState([]);
  const [licenseFiles, setLicenseFiles] = useState([]);
  const [visitingHours, setVisitingHours] = useState("");
  const [clinicDays, setClinicDays] = useState([]);
  const [notificationPreferences, setNotificationPreferences] = useState({
    email: true,
    sms: false,
  });

  // Fetch settings data from backend on component mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await api.get("/doctors/settings");
        const {
          name,
          specializations,
          visitingHours,
          clinicDays,
          notificationPreferences,
        } = response.data;
        setDoctorName(name);
        setSpecializations(specializations);
        setVisitingHours(visitingHours);
        setClinicDays(clinicDays);
        setNotificationPreferences(notificationPreferences);
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };
    fetchSettings();
  }, []);

  // Save updated settings to the backend
  const saveSettings = async () => {
    try {
      await api.put("/doctors/settings", {
        name: doctorName,
        specializations,
        visitingHours,
        clinicDays,
        notificationPreferences,
      });
      alert("Settings saved successfully.");
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Failed to save settings.");
    }
  };

  // Handle license file uploads
  const handleLicenseUpload = (e) => {
    setLicenseFiles([...licenseFiles, ...e.target.files]);
  };

  // Manage selected specializations
  const handleSpecializationChange = (e) => {
    const value = e.target.value;
    setSpecializations((prev) =>
      prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value],
    );
  };

  // Manage clinic days selection
  const handleClinicDayChange = (day) => {
    setClinicDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

  // Manage notification preferences
  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationPreferences((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  return (
    <div className="settings-content">
      <h2>Doctor Settings</h2>

      <div className="settings-form">
        <h3>Profile Information</h3>
        <div className="form-group">
          <label>Doctor Name:</label>
          <input
            type="text"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Specializations:</label>
          <select
            multiple
            onChange={handleSpecializationChange}
            className="multi-select"
            value={specializations}
          >
            <option value="Cardiology">Cardiology</option>
            <option value="Dermatology">Dermatology</option>
            <option value="Neurology">Neurology</option>
            {/* Add more options as needed */}
          </select>
        </div>

        <div className="form-group">
          <label>Upload Licenses:</label>
          <input
            type="file"
            multiple
            accept="application/pdf"
            onChange={handleLicenseUpload}
          />
        </div>

        <div className="form-group">
          <label>Visiting Hours:</label>
          <input
            type="text"
            value={visitingHours}
            onChange={(e) => setVisitingHours(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Clinic Days:</label>
          <div className="clinic-days">
            {[
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ].map((day) => (
              <label key={day}>
                <input
                  type="checkbox"
                  checked={clinicDays.includes(day)}
                  onChange={() => handleClinicDayChange(day)}
                />
                {day}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="settings-form">
        <h3>Notification Preferences</h3>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="email"
              checked={notificationPreferences.email}
              onChange={handleNotificationChange}
            />
            Email Notifications
          </label>
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="sms"
              checked={notificationPreferences.sms}
              onChange={handleNotificationChange}
            />
            SMS Notifications
          </label>
        </div>
        <button onClick={saveSettings}>Save Settings</button>
      </div>
    </div>
  );
}

export default Settings;
