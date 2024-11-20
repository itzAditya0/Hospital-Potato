// src/components/Patient/PSettings.js
import React, { useState, useContext, useEffect } from "react";
import api from "../../api";
import "./Styles/PPatients.css";
import { AuthContext } from "../../context/AuthContext";

const PSettings = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
  });

  useEffect(() => {
    setFormData({
      name: user.name,
      email: user.email,
      username: user.username,
    });
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      await api.put(`/api/users/${user._id}`, formData);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Update failed. Please try again.");
    }
  };

  return (
    <div className="settings-page">
      <h2>Profile Settings</h2>
      <form>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        />
        <button type="button" onClick={handleSave} className="btn-save">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default PSettings;
