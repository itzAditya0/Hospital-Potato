// src/components/Settings.js
import React, { useState, useEffect } from "react";
import api from "../../api";
import FloatingRegister from "./FloatingRegister";
import "./Styles/Settings.css";

function Settings() {
  const [hospitalName, setHospitalName] = useState("");
  const [operatingHours, setOperatingHours] = useState("");
  const [policies, setPolicies] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [notificationPreferences, setNotificationPreferences] = useState({
    email: true,
    sms: false,
    systemAlerts: true,
  });

  const [showDoctorRegister, setShowDoctorRegister] = useState(false);
  const [showPatientRegister, setShowPatientRegister] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const [hospitalResponse, doctorsResponse, patientsResponse] =
          await Promise.all([
            api.get("/settings/hospital"),
            api.get("/doctors"),
            api.get("/patients"),
          ]);

        const hospitalData = hospitalResponse.data;
        setHospitalName(hospitalData.name);
        setOperatingHours(hospitalData.operatingHours);
        setPolicies(hospitalData.policies);
        setDoctors(doctorsResponse.data);
        setPatients(patientsResponse.data);
        setNotificationPreferences(hospitalData.notificationPreferences);
      } catch (error) {
        console.error("Error fetching settings data:", error);
      }
    };

    fetchSettings();
  }, []);

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationPreferences((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const saveSettings = async () => {
    try {
      await api.put("/settings/hospital", {
        name: hospitalName,
        operatingHours,
        policies,
        notificationPreferences,
      });
      alert("Settings saved successfully!");
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Failed to save settings.");
    }
  };

  return (
    <div className="admin-settings-container">
      <h2>Admin Settings</h2>

      <div className="settings-form">
        <h3>Hospital Information</h3>
        <div className="form-group">
          <label>Hospital Name:</label>
          <input
            type="text"
            value={hospitalName}
            onChange={(e) => setHospitalName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Operating Hours:</label>
          <input
            type="text"
            value={operatingHours}
            onChange={(e) => setOperatingHours(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Policies:</label>
          <textarea
            value={policies}
            onChange={(e) => setPolicies(e.target.value)}
          />
        </div>
        <button onClick={saveSettings} className="save-btn">
          Save Settings
        </button>
      </div>

      <div className="settings-form">
        <h3>Manage Doctors</h3>
        <button onClick={() => setShowDoctorRegister(true)}>Add Doctor</button>
        <ul className="list-group">
          {doctors.map((doctor) => (
            <li key={doctor.id}>{doctor.name}</li>
          ))}
        </ul>
      </div>

      <div className="settings-form">
        <h3>Manage Patients</h3>
        <button onClick={() => setShowPatientRegister(true)}>
          Add Patient
        </button>
        <ul className="list-group">
          {patients.map((patient) => (
            <li key={patient.id}>{patient.name}</li>
          ))}
        </ul>
      </div>

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
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="systemAlerts"
              checked={notificationPreferences.systemAlerts}
              onChange={handleNotificationChange}
            />
            System Alerts
          </label>
        </div>
      </div>

      {/* Floating Register Modals */}
      {showDoctorRegister && (
        <FloatingRegister
          type="doctor"
          onClose={() => setShowDoctorRegister(false)}
        />
      )}
      {showPatientRegister && (
        <FloatingRegister
          type="patient"
          onClose={() => setShowPatientRegister(false)}
        />
      )}
    </div>
  );
}

export default Settings;
