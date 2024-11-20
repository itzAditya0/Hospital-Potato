import React, { useState, useEffect } from "react";
import { Route, Switch, Link, useLocation } from "react-router-dom";
import "./Styles/DoctorsDashboard.css";
import DDashboard from "../Doctors/DDashboard";
import DPatients from "../Doctors/DPatients";
import DAppointment from "../Doctors/DAppointment";
import DDoctors from "../Doctors/DDoctors";
import IPDPage from "../Doctors/IPDPatients"; // Import the IPDPage component
import EducationContent from "../Doctors/EducationContent";
import Settings from "../Doctors/Settings";

function DoctorDashboard() {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("");
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  useEffect(() => {
    switch (location.pathname) {
      case "/doctors/dashboard":
        setActiveSection("dashboard");
        break;
      case "/doctors/patients":
        setActiveSection("patients");
        break;
      case "/doctors/appointments":
        setActiveSection("appointments");
        break;
      case "/doctors/doctors":
        setActiveSection("doctors");
        break;
      case "/doctors/ipd": // New case for IPD page
        setActiveSection("ipd");
        break;
      case "/doctors/education-content":
        setActiveSection("education-content");
        break;
      case "/doctors/settings":
        setActiveSection("settings");
        break;
      default:
        setActiveSection("dashboard");
    }
  }, [location.pathname]);

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  return (
    <div className="doctor-dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <h2>JHC Clinic</h2>
        </div>
        <ul>
          <li className={activeSection === "dashboard" ? "active" : ""}>
            <Link to="/doctors/dashboard">Dashboard</Link>
          </li>
          <li className={activeSection === "patients" ? "active" : ""}>
            <Link to="/doctors/patients">Patients</Link>
          </li>
          <li className={activeSection === "appointments" ? "active" : ""}>
            <Link to="/doctors/appointments">Appointments / OPD</Link>
          </li>
          <li className={activeSection === "ipd" ? "active" : ""}>
            <Link to="/doctors/ipd">IPD</Link> {/* Link to IPD page */}
          </li>
          <li className={activeSection === "doctors" ? "active" : ""}>
            <Link to="/doctors/doctors">Doctors</Link>
          </li>
          <li className={activeSection === "education-content" ? "active" : ""}>
            <Link to="/doctors/education-content">Education Content</Link>
          </li>
        </ul>
        <div className="profile-section">
          <div className="profile" onClick={toggleProfileDropdown}>
            <img
              src="https://via.placeholder.com/40"
              alt="Profile"
              className="profile-image"
            />
            <span className="profile-name">Doctor</span>
          </div>
          {isProfileDropdownOpen && (
            <div className="profile-dropdown">
              <Link to="/doctors/settings" className="dropdown-item">
                Settings
              </Link>
              <Link to="/logout" className="dropdown-item">
                Logout
              </Link>
            </div>
          )}
        </div>
      </aside>

      <main className="main-content">
        <Switch>
          <Route exact path="/doctors/dashboard" component={DDashboard} />
          <Route exact path="/doctors/patients" component={DPatients} />
          <Route exact path="/doctors/appointments" component={DAppointment} />
          <Route exact path="/doctors/doctors" component={DDoctors} />
          <Route exact path="/doctors/ipd" component={IPDPage} />{" "}
          {/* IPD Route */}
          <Route
            exact
            path="/doctors/education-content"
            component={EducationContent}
          />
          <Route exact path="/doctors/settings" component={Settings} />
        </Switch>
      </main>
    </div>
  );
}

export default DoctorDashboard;
