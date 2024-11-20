// src/Doctor/NotificationList.js
import React, { useEffect, useState } from "react";
import api from "../../api";
import "./styles/NotificationList.css";

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await api.get("/doctors/notifications");
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchNotifications();
  }, []);

  return (
    <div className="notification-list-container">
      <h2>Notifications</h2>
      <ul className="notification-list">
        {notifications.map((notification, index) => (
          <li key={index} className={`notification-item ${notification.type}`}>
            {notification.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationList;
