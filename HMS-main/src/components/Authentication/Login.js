// Login.js:
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import styles from "./Styles/Login.module.css";

const Login = ({ type = "patient" }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

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

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/user/login`, {
        email: username,
        password,
      });

      const { data } = response;

      // Save the token and role to local storage
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      // Redirect based on user type
      if (type === "patient") {
        history.push("/patient/dashboard");
      } else if (type === "doctor") {
        history.push("/doctors/dashboard");
      } else if (type === "admin") {
        history.push("/admin/dashboard");
      }
    } catch (error) {
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
