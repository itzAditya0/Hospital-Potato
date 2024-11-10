// src/Doctor/NotificationList.js
import React from "react";
import "./styles/NotificationList.css";

const NotificationList = () => {
    const notifications = [
        { type: "info", message: "New patient assigned" },
        { type: "warning", message: "Surgery scheduled for tomorrow" },
        { type: "alert", message: "Emergency patient in ICU" },
    ];

    return (
        <div className="notification-list-container">
            <h2>Notifications</h2>
            <ul className="notification-list">
                {notifications.map((notification, index) => (
                    <li
                        key={index}
                        className={`notification-item ${notification.type}`}
                    >
                        {notification.message}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NotificationList;
