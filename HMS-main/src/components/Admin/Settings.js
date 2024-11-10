import React, { useState } from "react";
import "./Styles/Settings.css";

function Settings() {
    // State for hospital settings
    const [hospitalName, setHospitalName] = useState("");
    const [operatingHours, setOperatingHours] = useState("");
    const [policies, setPolicies] = useState("");

    // State for doctors and patients
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);

    // Notification preferences
    const [notificationPreferences, setNotificationPreferences] = useState({
        email: true,
        sms: false,
        systemAlerts: true,
    });

    // Handlers
    const handleNotificationChange = (e) => {
        const { name, checked } = e.target;
        setNotificationPreferences((prev) => ({
            ...prev,
            [name]: checked,
        }));
    };

    const handleAddDoctor = () => {
        // Logic for adding a new doctor
        const newDoctor = {
            id: doctors.length + 1,
            name: `Doctor ${doctors.length + 1}`,
        };
        setDoctors([...doctors, newDoctor]);
    };

    const handleAddPatient = () => {
        // Logic for adding a new patient
        const newPatient = {
            id: patients.length + 1,
            name: `Patient ${patients.length + 1}`,
        };
        setPatients([...patients, newPatient]);
    };

    return (
        <div className="admin-settings-container">
            <h2>Admin Settings</h2>

            <div className="settings-form">
                {/* Hospital Settings */}
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
            </div>

            <div className="settings-form">
                {/* Manage Doctors */}
                <h3>Manage Doctors</h3>
                <button onClick={handleAddDoctor}>Add Doctor</button>
                <ul className="list-group">
                    {doctors.map((doctor) => (
                        <li key={doctor.id}>{doctor.name}</li>
                    ))}
                </ul>
            </div>

            <div className="settings-form">
                {/* Manage Patients */}
                <h3>Manage Patients</h3>
                <button onClick={handleAddPatient}>Add Patient</button>
                <ul className="list-group">
                    {patients.map((patient) => (
                        <li key={patient.id}>{patient.name}</li>
                    ))}
                </ul>
            </div>

            <div className="settings-form">
                {/* Notification Preferences */}
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
        </div>
    );
}

export default Settings;
