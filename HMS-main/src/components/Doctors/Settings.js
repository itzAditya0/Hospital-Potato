// src/Doctor/Settings.js
import React, { useState } from "react";
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

    const handleLicenseUpload = (e) => {
        setLicenseFiles([...licenseFiles, ...e.target.files]);
    };

    const handleSpecializationChange = (e) => {
        const value = e.target.value;
        setSpecializations((prev) =>
            prev.includes(value)
                ? prev.filter((s) => s !== value)
                : [...prev, value],
        );
    };

    const handleClinicDayChange = (day) => {
        setClinicDays((prev) =>
            prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
        );
    };

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
                    >
                        <option value="Cardiology">Cardiology</option>
                        <option value="Dermatology">Dermatology</option>
                        <option value="Neurology">Neurology</option>
                        {/* Add more as needed */}
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
            </div>
        </div>
    );
}

export default Settings;
