import React, { useState } from 'react';
import './Styles/PSettings.css';

function PSettings() {
    const [profile, setProfile] = useState({
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "123-456-7890"
    });
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [notificationPreferences, setNotificationPreferences] = useState({
        email: true,
        sms: false,
    });

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handlePasswordChange = () => {
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        // Add logic for password change
        alert("Password updated successfully!");
    };

    const handleNotificationChange = (e) => {
        const { name, checked } = e.target;
        setNotificationPreferences({ ...notificationPreferences, [name]: checked });
    };

    return (
        <div className="settings-container">
            <h2>Account Settings</h2>

            {/* Profile Information */}
            <div className="settings-section">
                <h3>Profile Information</h3>
                <div className="settings-form">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={profile.name}
                        onChange={handleProfileChange}
                    />

                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleProfileChange}
                    />

                    <label>Phone:</label>
                    <input
                        type="text"
                        name="phone"
                        value={profile.phone}
                        onChange={handleProfileChange}
                    />

                    <button className="save-button">Save Profile</button>
                </div>
            </div>

            {/* Change Password */}
            <div className="settings-section">
                <h3>Change Password</h3>
                <div className="settings-form">
                    <label>New Password:</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />

                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <button className="save-button" onClick={handlePasswordChange}>
                        Update Password
                    </button>
                </div>
            </div>

            {/* Notification Preferences */}
            <div className="settings-section">
                <h3>Notification Preferences</h3>
                <div className="settings-form">
                    <label>
                        <input
                            type="checkbox"
                            name="email"
                            checked={notificationPreferences.email}
                            onChange={handleNotificationChange}
                        />
                        Email Notifications
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            name="sms"
                            checked={notificationPreferences.sms}
                            onChange={handleNotificationChange}
                        />
                        SMS Notifications
                    </label>

                    <button className="save-button">Save Preferences</button>
                </div>
            </div>

            {/* Privacy Settings */}
            <div className="settings-section">
                <h3>Privacy Settings</h3>
                <div className="settings-form">
                    <p>Control the visibility of your profile data and how it is shared with third-party services.</p>
                    <button className="save-button">Manage Privacy</button>
                </div>
            </div>
        </div>
    );
}

export default PSettings;