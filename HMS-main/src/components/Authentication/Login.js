import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./Styles/Login.module.css";

const Login = ({ type = "patient" }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  // Function to get the correct header based on the user type
  const getHeader = () => {
    switch (type) {
      case "doctor":
        return "Doctor Login";
      case "admin":
        return "Admin Login";
      default:
        return "Patient Login";
    }
  };

  // Hardcoded credentials for each role
  const credentials = {
    patient: { email: "patient@example.com", password: "Patient@123" },
    doctor: { email: "doctor@example.com", password: "Doctor@123" },
    admin: { email: "admin@example.com", password: "Admin@123" },
  };

  // Function to handle login submission
  const handleLogin = (e) => {
    e.preventDefault();

    // Get the correct credentials based on the user type
    const validCredentials = credentials[type];

    // Check if the entered credentials match the hardcoded credentials
    if (
      username === validCredentials.email &&
      password === validCredentials.password
    ) {
      // Redirect based on the user type
      const dashboardPath =
        type === "patient"
          ? "/patient/dashboard"
          : type === "doctor"
            ? "/doctors/dashboard"
            : "/admin/dashboard";
      history.push(dashboardPath);
    } else {
      // Show error message if credentials are incorrect
      setErrorMessage("Invalid username or password");
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.loginContainer}>
        <header className={styles.header}>{getHeader()}</header>

        <form onSubmit={handleLogin}>
          <div className={styles.inputBox}>
            <input
              type="text"
              className={styles.inputField}
              placeholder="Username or Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <i className="bx bx-user"></i>
          </div>

          <div className={styles.inputBox}>
            <input
              type="password"
              className={styles.inputField}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <i className="bx bx-lock-alt"></i>
          </div>

          {/* Error message display */}
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}

          <div className={styles.inputBox}>
            <input type="submit" className={styles.submit} value="Sign In" />
          </div>

          <div className={styles.twoCol}>
            <div className={styles.one}>
              <input type="checkbox" id="login-check" />
              <label htmlFor="login-check"> Remember Me</label>
            </div>
            <div className={styles.two}>
              <a href="#">Forgot password?</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
