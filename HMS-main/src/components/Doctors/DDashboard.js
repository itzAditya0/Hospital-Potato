// src/Doctor/DDashboard.js
import React from "react";
import DoctorProfile from "./DoctorProfile";
import OverviewCard from "./OverviewCard";
import TaskList from "./TaskList";
import NotificationList from "./NotificationList";
import Calendar from "./Calendar";
import "./styles/DDashboard.css";

const DDashboard = () => {
    // Sample data for testing
    const doctor = {
        name: "Dr. John Smith",
        specialization: "Cardiologist",
        visitingHours: "Mon-Fri, 9 AM - 3 PM",
        profileImage: "https://via.placeholder.com/80", // Replace with actual image link if available
    };

    const tasks = [
        {
            id: 1,
            title: "Complete patient evaluations",
            completed: false,
            priority: "High",
        },
        {
            id: 2,
            title: "Review lab results",
            completed: true,
            priority: "Medium",
        },
        {
            id: 3,
            title: "Prepare for surgery",
            completed: false,
            priority: "Low",
        },
    ];

    const notifications = [
        { id: 1, message: "New appointment with Patient #12345", type: "info" },
        { id: 2, message: "Surgery scheduled for 3 PM", type: "alert" },
        { id: 3, message: "Patient #56789 lab results ready", type: "warning" },
    ];

    const appointments = [
        {
            id: 1,
            patientName: "Alice Brown",
            date: "2024-10-30",
            time: "10:00 AM",
            status: "Confirmed",
        },
        {
            id: 2,
            patientName: "Tom White",
            date: "2024-10-30",
            time: "11:30 AM",
            status: "Pending",
        },
        {
            id: 3,
            patientName: "Lucy Black",
            date: "2024-10-30",
            time: "1:00 PM",
            status: "Cancelled",
        },
    ];

    return (
        <div className="ddashboard-container">
            <h2>Doctor's Dashboard</h2>
            <div className="dashboard-content">
                {/* Profile and Overview Section */}
                <DoctorProfile doctor={doctor} />
                <div className="overview-cards">
                    <OverviewCard
                        title="Total Patients"
                        value="120"
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
                            <a href="/doctors/appointments">
                                Manage Appointments
                            </a>
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
