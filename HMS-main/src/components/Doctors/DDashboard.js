// src/Doctor/DDashboard.js
import React, { useState, useEffect } from "react";
import DoctorProfile from "./DoctorProfile";
import OverviewCard from "./OverviewCard";
import TaskList from "./TaskList";
import NotificationList from "./NotificationList";
import Calendar from "./Calendar";
import api from "../../api";
import "./styles/DDashboard.css";

const DDashboard = () => {
  const [doctor, setDoctor] = useState({});
  const [tasks, setTasks] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [
          doctorResponse,
          tasksResponse,
          notificationsResponse,
          appointmentsResponse,
        ] = await Promise.all([
          api.get("/doctors/profile"),
          api.get("/doctors/tasks"),
          api.get("/doctors/notifications"),
          api.get("/appointments"),
        ]);

        setDoctor(doctorResponse.data);
        setTasks(tasksResponse.data);
        setNotifications(notificationsResponse.data);
        setAppointments(appointmentsResponse.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="ddashboard-container">
      <h2>Doctor's Dashboard</h2>
      <div className="dashboard-content">
        {/* Profile and Overview Section */}
        <DoctorProfile doctor={doctor} />
        <div className="overview-cards">
          <OverviewCard
            title="Total Patients"
            value="120" // Replace with dynamic data if available
            icon={<i className="fas fa-users"></i>}
          />
          <OverviewCard
            title="Upcoming Appointments"
            value={appointments.length}
            icon={<i className="fas fa-calendar-alt"></i>}
          />
          <OverviewCard
            title="Tasks"
            value={tasks.length}
            icon={<i className="fas fa-tasks"></i>}
          />
          <OverviewCard
            title="Notifications"
            value={notifications.length}
            icon={<i className="fas fa-bell"></i>}
          />
        </div>

        {/* Main Sections */}
        <div className="main-sections">
          <div className="recent-activity">
            <h3>Recent Activity</h3>
            <NotificationList notifications={notifications} />
          </div>
          <div className="task-calendar">
            <h3>Your Tasks</h3>
            <TaskList tasks={tasks} />
            <h3>Today's Schedule</h3>
            <Calendar appointments={appointments} />
          </div>
        </div>

        {/* Quick Links */}
        <div className="quick-links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="/doctors/patients">View Patients</a>
            </li>
            <li>
              <a href="/doctors/appointments">Manage Appointments</a>
            </li>
            <li>
              <a href="/doctors/tasks">Check Tasks</a>
            </li>
            <li>
              <a href="/doctors/settings">Settings</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DDashboard;
