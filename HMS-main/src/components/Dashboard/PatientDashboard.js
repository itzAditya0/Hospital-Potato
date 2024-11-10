import React, { useState, useEffect } from "react";
import { Route, Switch, Link, useLocation } from "react-router-dom";
import "./Styles/PatientDashboard.css"; // Update this with the correct CSS file if needed
import Dashboard from "../Patient/PDashboard";
import DoctorsPage from "../Patient/PDoctors";
import Appointments from "../Patient/PAppointments";
//import PatientPage from "../Patient/PPatients";
import EducationContentPage from "../Patient/PEducationContent";
import PrescriptionPage from "../Patient/PPrescriptions";
import PSettings from "../Patient/PSettings"; // Import the PSettings component
import ReportsPage from "../Patient/ReportsPage";
import PatientOPDIPD from "../Patient/PatientOPDIPD";
import DoctorReviews from "../Patient/DoctorReviews"; // Import the new DoctorReviews component

function PatientDashboard() {
  const location = useLocation(); // Get current path
  const [activeSection, setActiveSection] = useState("");
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false); // Track dropdown state

  // Set the active section based on the URL path
  useEffect(() => {
    switch (location.pathname) {
      case "/patient/dashboard":
        setActiveSection("dashboard");
        break;
      case "/patient/doctors":
        setActiveSection("doctors");
        break;
      case "/patient/appointments":
        setActiveSection("appointments");
        break;
      case "/patient/report":
        setActiveSection("report");
        break;
      case "/patient/education-content":
        setActiveSection("education-content");
        break;
      case "/patient/prescriptions":
        setActiveSection("prescriptions");
        break;
      case "/patient/opd-ipd":
        setActiveSection("opd-ipd");
        break;
      case "/patient/reviews": // New reviews route
        setActiveSection("reviews");
        break;
      case "/patient/settings":
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

  const [appointments, setAppointments] = useState([]); // Define appointments

  useEffect(() => {
    // Mock or fetch appointments data
    setAppointments([
      { id: 1, doctor: "Dr. John Doe", date: "2024-11-10" },
      { id: 2, doctor: "Dr. Sarah Lee", date: "2024-11-12" },
    ]);
  }, []);

  return (
    <div className="dashboard">
      <div className="sidebar">
        <div className="sidebar-logo">
          <h2>JHC Clinic</h2>
        </div>
        <ul>
          <li className={activeSection === "dashboard" ? "active" : ""}>
            <Link to="/patient/dashboard">Dashboard</Link>
          </li>
          <li className={activeSection === "doctors" ? "active" : ""}>
            <Link to="/patient/doctors">Doctors</Link>
          </li>
          <li className={activeSection === "appointments" ? "active" : ""}>
            <Link to="/patient/appointments">Appointments</Link>
          </li>
          <li className={activeSection === "report" ? "active" : ""}>
            <Link to="/patient/report">Reports</Link>
          </li>
          <li className={activeSection === "prescriptions" ? "active" : ""}>
            <Link to="/patient/prescriptions">Prescriptions</Link>
          </li>
          <li className={activeSection === "education-content" ? "active" : ""}>
            <Link to="/patient/education-content">Education Content</Link>
          </li>
          <li className={activeSection === "opd-ipd" ? "active" : ""}>
            <Link to="/patient/opd-ipd">OPD / IPD</Link>
          </li>
          <li className={activeSection === "reviews" ? "active" : ""}>
            <Link to="/patient/reviews">Doctor Reviews</Link>{" "}
            {/* New link for reviews */}
          </li>
        </ul>

        {/* Profile section with dropdown */}
        <div className="profile-section">
          <div className="profile" onClick={toggleProfileDropdown}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ7TKHo1NrGHSRkso1dt1oE04qoPOGEKCiUA&s" // Replace with a profile image URL
              alt="Profile"
              className="profile-image"
            />
            <span className="profile-name">Patient</span>
          </div>
          {isProfileDropdownOpen && (
            <div className="profile-dropdown">
              <Link to="/patient/settings" className="dropdown-item">
                Settings
              </Link>
              <Link to="/logout" className="dropdown-item">
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Main content that dynamically changes with routes */}
      <div className="main-content">
        <Switch>
          <Route exact path="/patient/dashboard" component={Dashboard} />
          <Route exact path="/patient/doctors" component={DoctorsPage} />
          <Route exact path="/patient/appointments" component={Appointments} />
          <Route exact path="/patient/report" component={ReportsPage} />
          <Route
            exact
            path="/patient/education-content"
            component={EducationContentPage}
          />
          <Route
            exact
            path="/patient/prescriptions"
            component={PrescriptionPage}
          />
          <Route exact path="/patient/opd-ipd" component={PatientOPDIPD} />
          <Route exact path="/patient/settings" component={PSettings} />
          <Route
            exact
            path="/patient/reviews"
            component={() => <DoctorReviews appointments={appointments} />}
          />{" "}
          {/* New route for DoctorReviews */}
        </Switch>
      </div>
    </div>
  );
}

export default PatientDashboard;
