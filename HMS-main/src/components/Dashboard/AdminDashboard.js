import React, { useState, useEffect } from "react";
import { Route, Switch, Link, useLocation } from "react-router-dom";
import "./Styles/AdminDashboard.css";
import Dashboard from "../Admin/Dashboard";
import PatientPage from "../Admin/Patients";
import Appointments from "../Admin/Appointments";
import DoctorsPage from "../Admin/Doctors";
import OpdPage from "../Admin/Opd"; // Corrected to match import name
import IPDPage from "../Admin/Ipd";
import EducationContent from "../Admin/EducationContent";
import Settings from "../Admin/Settings";

function AdminDashboard() {
    const location = useLocation();
    const [activeSection, setActiveSection] = useState("");
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    // Set the active section based on the URL path
    useEffect(() => {
        switch (location.pathname) {
            case "/admin/dashboard":
                setActiveSection("dashboard");
                break;
            case "/admin/patients":
                setActiveSection("patients");
                break;
            case "/admin/appointments":
                setActiveSection("appointments");
                break;
            case "/admin/IPD":
                setActiveSection("IPD");
                break;
            case "/admin/Opd":
                setActiveSection("OPD"); // Updated to match the Opd route
                break;
            case "/admin/doctors":
                setActiveSection("doctors");
                break;
            case "/admin/education-content":
                setActiveSection("education-content");
                break;
            case "/admin/settings":
                setActiveSection("settings");
                break;
            default:
                setActiveSection("dashboard");
        }
    }, [location.pathname]);

    // Toggle profile dropdown
    const toggleProfileDropdown = () => {
        setIsProfileDropdownOpen(!isProfileDropdownOpen);
    };

    return (
        <div className="dashboard">
            <aside className="sidebar">
                <div className="sidebar-logo">
                    <h2>MedTech</h2>
                </div>
                <ul>
                    <li className={activeSection === "dashboard" ? "active" : ""}>
                        <Link to="/admin/dashboard">Dashboard</Link>
                    </li>
                    <li className={activeSection === "patients" ? "active" : ""}>
                        <Link to="/admin/patients">Patients</Link>
                    </li>
                    <li className={activeSection === "appointments" ? "active" : ""}>
                        <Link to="/admin/appointments">Appointments</Link>
                    </li>
                    <li className={activeSection === "doctors" ? "active" : ""}>
                        <Link to="/admin/doctors">Doctors</Link>
                    </li>
                    <li className={activeSection === "IPD" ? "active" : ""}>
                        <Link to="/admin/IPD">IPD</Link>
                    </li>
                    <li className={activeSection === "OPD" ? "active" : ""}>
                        <Link to="/admin/Opd">OPD</Link> {/* Corrected route path */}
                    </li>
                    <li className={activeSection === "education-content" ? "active" : ""}>
                        <Link to="/admin/education-content">Education Content</Link>
                    </li>
                </ul>

                {/* Profile section with dropdown */}
                <div className="profile-section">
                    <div className="profile" onClick={toggleProfileDropdown}>
                        <img
                            src="https://via.placeholder.com/40"
                            alt="Profile"
                            className="profile-image"
                        />
                        <span className="profile-name">Admin</span>
                    </div>
                    {isProfileDropdownOpen && (
                        <div className="profile-dropdown">
                            <Link to="/admin/settings" className="dropdown-item">
                                Settings
                            </Link>
                            <Link to="/logout" className="dropdown-item">
                                Logout
                            </Link>
                        </div>
                    )}
                </div>
            </aside>

            {/* Main content that dynamically changes with routes */}
            <main className="main-content">
                <Switch>
                    <Route exact path="/admin/dashboard" component={Dashboard} />
                    <Route exact path="/admin/patients" component={PatientPage} />
                    <Route exact path="/admin/appointments" component={Appointments} />
                    <Route exact path="/admin/doctors" component={DoctorsPage} />
                    <Route exact path="/admin/IPD" component={IPDPage} />
                    <Route exact path="/admin/Opd" component={OpdPage} /> {/* Updated route and component */}
                    <Route exact path="/admin/education-content" component={EducationContent} />
                    <Route exact path="/admin/settings" component={Settings} />
                </Switch>
            </main>
        </div>
    );
}

export default AdminDashboard;
