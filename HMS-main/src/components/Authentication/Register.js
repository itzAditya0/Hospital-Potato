import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import styles from "./Styles/Register.module.css";

const Register = ({ type = "patient" }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous error messages

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      // Debug log for form data being sent
      console.log("Registering with data:", {
        ...formData,
        role: type || "patient",
      });

      const response = await axios.post("/api/user/register", {
        ...formData,
        role: type || "patient", // Ensure role is set
      });

      if (response.data) {
        // Redirect to login page after successful registration
        history.push(`/login/${type}`);
      }
    } catch (error) {
      console.error("Registration error:", error.response || error.message);
      setErrorMessage(
        error.response?.data?.message ||
          "Registration failed. Please try again.",
      );
    }
  };

  return (
    <div className={styles.registerPage}>
      <div className={styles.registerContainer}>
        <header className={styles.header}>
          {type.charAt(0).toUpperCase() + type.slice(1)} Registration
        </header>

        <form onSubmit={handleRegister}>
          <div className={styles.inputBox}>
            <input
              type="text"
              name="name"
              className={styles.inputField}
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <i className="bx bx-user"></i>
          </div>
          <div className={styles.inputBox}>
            <input
              type="email"
              name="email"
              className={styles.inputField}
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <i className="bx bx-envelope"></i>
          </div>
          <div className={styles.inputBox}>
            <input
              type="text"
              name="username"
              className={styles.inputField}
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
            <i className="bx bx-user"></i>
          </div>
          <div className={styles.inputBox}>
            <input
              type="password"
              name="password"
              className={styles.inputField}
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <i className="bx bx-lock-alt"></i>
          </div>
          <div className={styles.inputBox}>
            <input
              type="password"
              name="confirmPassword"
              className={styles.inputField}
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
            <i className="bx bx-lock-alt"></i>
          </div>

          {errorMessage && <p className={styles.error}>{errorMessage}</p>}

          <div className={styles.inputBox}>
            <input type="submit" className={styles.submit} value="Register" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
