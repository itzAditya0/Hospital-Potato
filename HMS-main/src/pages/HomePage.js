// src/pages/HomePage.js

import React from "react";
import ScrollToTop from "./ScrollToTop";
import Testimonials from "./Testimonials";
import { Link } from "react-router-dom";
import "./Styles/HomePage.css";
import heroImage from "../assets/hero-image.jpg";

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Full-Screen Hero Section */}
      <section
        className="hero-section"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="animated-title">Welcome to HealthCare Hub</h1>
          <p className="hero-subtitle">Where Care Meets Innovation</p>
          <Link to="/login-options" className="cta-button-link">
            Login / Register
          </Link>
        </div>
      </section>

      {/* Information Section */}
      <section className="info-section">
        <h2 className="info-title">Empowering Every Role</h2>
        <div className="info-cards">
          <div className="info-card">
            <h3>For Patients</h3>
            <p>
              Access medical records, book appointments, and stay informed about
              your health, all in one place.
            </p>
          </div>
          <div className="info-card">
            <h3>For Doctors</h3>
            <p>
              Manage patient appointments, view medical histories, and stay
              organized with ease.
            </p>
          </div>
          <div className="info-card">
            <h3>For Admins</h3>
            <p>
              Oversee hospital operations, staff scheduling, and patient records
              with powerful administrative tools.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section with Expandable Feature Details */}
      <section className="features-section">
        <h2>Key Features</h2>
        <ul className="features-list">
          <li className="feature-item">
            <div className="feature-title">Real-time Patient Management</div>
            <div className="feature-detail">
              Manage patient data instantly, ensuring all information is
              up-to-date and accessible at all times.
            </div>
          </li>
          <li className="feature-item">
            <div className="feature-title">Secure Data Access</div>
            <div className="feature-detail">
              Ensure that sensitive patient information is protected with
              top-tier security protocols.
            </div>
          </li>
          <li className="feature-item">
            <div className="feature-title">Appointment Scheduling</div>
            <div className="feature-detail">
              Easily schedule, modify, and cancel appointments with a
              user-friendly interface.
            </div>
          </li>
          <li className="feature-item">
            <div className="feature-title">Reporting and Analytics</div>
            <div className="feature-detail">
              Generate detailed reports and analytics to track performance and
              patient outcomes.
            </div>
          </li>
          <li className="feature-item">
            <div className="feature-title">Telemedicine Integration</div>
            <div className="feature-detail">
              Provide virtual consultations and follow-ups through integrated
              telemedicine solutions.
            </div>
          </li>
          <li className="feature-item">
            <div className="feature-title">Customizable Dashboards</div>
            <div className="feature-detail">
              Tailor dashboards to meet the specific needs of different users
              within the system.
            </div>
          </li>
        </ul>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Footer Section */}
      <footer className="homepage-footer">
        <p>Contact us: info@hospital.com | 123-456-7890</p>
        <div className="social-links">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="social-icon"
          >
            Facebook
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="social-icon"
          >
            Twitter
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="social-icon"
          >
            Instagram
          </a>
        </div>
        <p>&copy; 2023 HealthCare Hub. All rights reserved.</p>
      </footer>

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
};

export default HomePage;
