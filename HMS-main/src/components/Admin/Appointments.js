import React, { useState } from 'react';
import './Styles/Appointments.css';

const Appointments = () => {
    const [appointments, setAppointments] = useState([
        { id: 1, patientName: 'Elizabeth Polson', doctor: 'Dr. John', department: 'Cardiology', time: '9:30 AM', date: '2022-12-05', status: 'Pending' },
        { id: 2, patientName: 'John David', doctor: 'Dr. Joel', department: 'Neurology', time: '10:00 AM', date: '2022-12-05', status: 'Pending' },
        { id: 3, patientName: 'Sumanth Tinson', doctor: 'Dr. John', department: 'Cardiology', time: '11:30 AM', date: '2022-12-05', status: 'Pending' },
        { id: 4, patientName: 'Alice Brown', doctor: 'Dr. Smith', department: 'Dermatology', time: '2:00 PM', date: '2023-12-15', status: 'Pending' } // Future appointment
    ]);

    const [viewType, setViewType] = useState("upcoming");
    const [filters, setFilters] = useState({ name: '', dateRange: 'all' });
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const today = new Date();

    const upcomingAppointments = appointments.filter((appt) => new Date(appt.date) > today);
    const previousAppointments = appointments.filter((appt) => new Date(appt.date) < today);

    const handleViewChange = (view) => {
        setViewType(view);
        setFilters((prev) => ({ ...prev, dateRange: 'all' }));
    };

    const handleSearchChange = (e) => {
        setFilters({ ...filters, name: e.target.value });
    };

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handleDateRangeChange = (range) => {
        setFilters({ ...filters, dateRange: range });
        setDropdownOpen(false);
    };

    const getDateFilteredAppointments = (appointmentsList) => {
        const filteredAppointments = appointmentsList.filter((appt) => 
            appt.patientName.toLowerCase().includes(filters.name.toLowerCase())
        );

        switch (filters.dateRange) {
            case 'today':
                return filteredAppointments.filter((appt) =>
                    new Date(appt.date).toDateString() === today.toDateString()
                );
            case 'week':
                return filteredAppointments.filter((appt) =>
                    new Date(appt.date) > new Date(today.setDate(today.getDate() - 7))
                );
            case 'month':
                return filteredAppointments.filter((appt) =>
                    new Date(appt.date).getMonth() === today.getMonth()
                );
            default:
                return filteredAppointments;
        }
    };

    const displayedAppointments = viewType === "upcoming" ? upcomingAppointments : previousAppointments;
    const filteredAppointments = getDateFilteredAppointments(displayedAppointments);

    return (
        <div className="appointments-content">
            <div className="appointments-header">
                <h2>Appointments</h2>
                <div className="view-toggle-buttons">
                    <button
                        onClick={() => handleViewChange("upcoming")}
                        className={`view-button ${viewType === "upcoming" ? "active" : ""}`}
                    >
                        Upcoming Appointments
                    </button>
                    <button
                        onClick={() => handleViewChange("previous")}
                        className={`view-button ${viewType === "previous" ? "active" : ""}`}
                    >
                        Previous Appointments
                    </button>
                </div>
            </div>

            {/* Search and Filter Section */}
            <div className="search-filter">
                <input
                    type="text"
                    placeholder="Search by Patient Name"
                    value={filters.name}
                    onChange={handleSearchChange}
                    className="search-bar"
                />
                <div className="filter-container">
                    <button onClick={toggleDropdown} className="filter-button">
                        Filter by
                    </button>
                    {isDropdownOpen && (
                        <div className="filter-dropdown">
                            {viewType === "upcoming" ? (
                                <>
                                    <button onClick={() => handleDateRangeChange("today")}>Today</button>
                                    <button onClick={() => handleDateRangeChange("week")}>Next Week</button>
                                    <button onClick={() => handleDateRangeChange("month")}>Next Month</button>
                                </>
                            ) : (
                                <>
                                    <button onClick={() => handleDateRangeChange("today")}>Today</button>
                                    <button onClick={() => handleDateRangeChange("week")}>Past Week</button>
                                    <button onClick={() => handleDateRangeChange("month")}>Past Month</button>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <table className="appointments__table">
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Date</th>
                        <th>Patient Name</th>
                        <th>Doctor</th>
                        <th>Department</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAppointments.map((appointment) => (
                        <tr key={appointment.id}>
                            <td>{appointment.time}</td>
                            <td>{appointment.date}</td>
                            <td>{appointment.patientName}</td>
                            <td>{appointment.doctor}</td>
                            <td>{appointment.department}</td>
                            <td>
                                <span className={`appointments__status appointments__status--${appointment.status.toLowerCase()}`}>
                                    {appointment.status}
                                </span>
                            </td>
                            <td>
                                <button className="button--status-toggle">Mark Completed</button>
                                <button className="button--reschedule">Reschedule</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Appointments;
