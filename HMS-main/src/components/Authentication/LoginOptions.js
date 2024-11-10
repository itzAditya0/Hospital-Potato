// LoginOptions.js:
import React from "react";
import { Link } from "react-router-dom";
import styles from "./Styles/LoginOptions.module.css"; // Assuming CSS Modules are being used
import patient from "../../assets/patient.png"; // Assuming patient image is in assets
import doctor from "../../assets/doctor.png"; // Assuming doctor image is in assets
import admin from "../../assets/admin.png"; // Assuming admin image is in assets

const LoginOptions = () => {
  return (
    <div className={styles.loginPage}>
      {" "}
      {/* Using CSS Modules */}
      <div className={styles.headerContainer}>
        <div className={styles.loginHeader}>
          <h1>LOGIN / REGISTER</h1>
        </div>
      </div>
      <div className={styles.loginContainer}>
        {/* For Patients */}
        <div className={styles.loginBox}>
          <img src={patient} alt="For Patients" />
          <h2>For Patients</h2>
          <p>
            Take your healthcare to the next level. Take it into your hands. You
            choose the care you need from a select group of physicians from the
            convenience of your home.
          </p>
          <div className={styles.buttonGroup1}>
            {/* Patient login and register routes */}
            <Link to="/login/patient">
              <button>Login</button>
            </Link>
            <Link to="/register/patient">
              <button>Register</button>
            </Link>
          </div>
        </div>

        {/* For Doctors */}
        <div className={styles.loginBox}>
          <img src={doctor} alt="For Doctors" />
          <h2>For Doctors</h2>
          <p>
            Elevate your healthcare delivery—provide care to patients
            efficiently. Improve your patient base and access.
          </p>
          <div className={styles.buttonGroup2}>
            {/* Doctor login route */}
            <Link to="/login/doctor">
              <button>Login</button>
            </Link>
          </div>
        </div>

        {/* For Admins */}
        <div className={styles.loginBox}>
          <img src={admin} alt="Admin" />
          <h2>For Admin</h2>
          <p>Admin login for overall management and everything.</p>
          <div className={styles.buttonGroup2}>
            {/* Admin login route */}
            <Link to="/login/admin">
              <button>Login</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginOptions;
