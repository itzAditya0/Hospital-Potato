// Register.js

import React from "react";
import styles from "./Styles/Register.module.css";

const Register = ({ type = "patient" }) => {

  return (
    <div className={styles.registerPage}>
      <div className={styles.registerContainer}>
        <header className={styles.header}>Patient Registration</header>

        {/* Personal Information */}
        <div className={styles.inputBox}>
          <input
            type="text"
            className={styles.inputField}
            placeholder="Full Name"
          />
          <i className="bx bx-user"></i>
        </div>
        <div className={styles.twoForms}>
          <div className={styles.inputBox}>
            <input
              type="date"
              className={styles.inputField}
              placeholder="Date of Birth"
            />
            <i className="bx bx-calendar"></i>
          </div>
          <div className={styles.inputBox}>
            <select className={styles.inputField}>
              <option value="" disabled selected>Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <i className="bx bx-user"></i>
          </div>
        </div>

        {/* Contact Information */}
        <div className={styles.inputBox}>
          <input
            type="tel"
            className={styles.inputField}
            placeholder="Phone Number"
          />
          <i className="bx bx-phone"></i>
        </div>
        <div className={styles.inputBox}>
          <input
            type="email"
            className={styles.inputField}
            placeholder="Email Address"
          />
          <i className="bx bx-envelope"></i>
        </div>

        {/* Account Information */}
        <div className={styles.inputBox}>
          <input
            type="text"
            className={styles.inputField}
            placeholder="Username"
          />
          <i className="bx bx-user"></i>
        </div>
        <div className={styles.inputBox}>
          <input
            type="password"
            className={styles.inputField}
            placeholder="Password"
          />
          <i className="bx bx-lock-alt"></i>
        </div>
        <div className={styles.inputBox}>
          <input
            type="password"
            className={styles.inputField}
            placeholder="Confirm Password"
          />
          <i className="bx bx-lock-alt"></i>
        </div>

        {/* Emergency Contact Information */}
        <div className={styles.inputBox}>
          <input
            type="text"
            className={styles.inputField}
            placeholder="Emergency Contact Name"
          />
          <i className="bx bx-user"></i>
        </div>
        <div className={styles.inputBox}>
          <input
            type="tel"
            className={styles.inputField}
            placeholder="Emergency Contact Phone"
          />
          <i className="bx bx-phone"></i>
        </div>

        {/* Consent and Agreements */}
        <div className={styles.one}>
          <input type="checkbox" id="register-check" />
          <label htmlFor="register-check">
            <a href="#">Terms & Conditions</a>
          </label>
        </div>

        {/* Submit Button */}
        <div className={styles.inputBox}>
          <input type="submit" className={styles.submit} value="Register" />
        </div>
      </div>
    </div>
  );
};

export default Register;
