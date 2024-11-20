// src/components/Admin/FloatingRegister.js
import React, { useState } from "react";
import api from "../../api";
import styles from "./Styles/FloatingRegister.css";

const FloatingRegister = ({ type = "patient", onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      await api.post("/user/register", { ...formData, role: type });
      alert(
        `${type.charAt(0).toUpperCase() + type.slice(1)} registered successfully`,
      );
      onClose();
    } catch {
      setErrorMessage("Registration failed");
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <header className={styles.header}>
          {type.charAt(0).toUpperCase() + type.slice(1)} Registration
          <button onClick={onClose} className={styles.closeBtn}>
            ×
          </button>
        </header>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default FloatingRegister;
