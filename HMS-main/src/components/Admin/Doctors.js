import React, { useState, useEffect } from "react";
import api from "../../api"; // Import Axios instance for backend calls
import "./Styles/Doctors.css";

const DoctorsPage = () => {
  const [departments, setDepartments] = useState([]);
  const [expandedDepartment, setExpandedDepartment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newDoctorName, setNewDoctorName] = useState("");
  const [newDoctorSpecialization, setNewDoctorSpecialization] = useState("");
  const [newDoctorSlots, setNewDoctorSlots] = useState("");
  const [newDepartmentName, setNewDepartmentName] = useState("");

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await api.get("/departments");
        setDepartments(response.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    fetchDepartments();
  }, []);

  const toggleDepartment = (index) => {
    setExpandedDepartment(expandedDepartment === index ? null : index);
  };

  const addDepartment = async () => {
    if (!newDepartmentName.trim()) return alert("Enter a department name.");
    try {
      const response = await api.post("/departments", {
        name: newDepartmentName,
      });
      setDepartments([...departments, response.data]);
      setNewDepartmentName("");
    } catch (error) {
      console.error("Error adding department:", error);
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setNewDoctorName("");
    setNewDoctorSpecialization("");
    setNewDoctorSlots("");
  };

  const addDoctor = async (departmentIndex) => {
    if (!newDoctorName || !newDoctorSpecialization || !newDoctorSlots) {
      return alert("Please fill in all doctor details.");
    }

    const slots = newDoctorSlots.split(",").map((slot) => slot.trim());
    const newDoctor = {
      name: newDoctorName,
      specialization: newDoctorSpecialization,
      slots,
    };

    try {
      const response = await api.post(
        `/departments/${departments[departmentIndex].id}/doctors`,
        newDoctor,
      );
      const updatedDepartments = [...departments];
      updatedDepartments[departmentIndex].doctors.push(response.data);
      setDepartments(updatedDepartments);
      closeModal();
    } catch (error) {
      console.error("Error adding doctor:", error);
    }
  };

  return (
    <div className="doctors-container">
      <h2>Departments & Doctors</h2>

      {/* Department management input */}
      <div className="department-management">
        <input
          type="text"
          placeholder="New Department Name"
          value={newDepartmentName}
          onChange={(e) => setNewDepartmentName(e.target.value)}
        />
        <button onClick={addDepartment}>Add Department</button>
      </div>

      {/* Department List */}
      <div className="departments-list">
        {departments.map((dept, index) => (
          <div key={dept.id} className="department-card">
            <div
              className="department-header"
              onClick={() => toggleDepartment(index)}
            >
              <h3>{dept.name}</h3>
              <p>{dept.doctors.length} doctors</p>
            </div>

            {expandedDepartment === index && (
              <div className="department-details">
                <table className="doctor-table">
                  <thead>
                    <tr>
                      <th>Doctor Name</th>
                      <th>Specialization</th>
                      <th>Time Slots</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dept.doctors.map((doctor) => (
                      <tr key={doctor.id}>
                        <td>{doctor.name}</td>
                        <td>{doctor.specialization}</td>
                        <td>{doctor.slots.join(", ")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button className="add-doctor-button" onClick={openModal}>
                  Add Doctor
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Doctor Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add New Doctor</h3>
            <input
              type="text"
              placeholder="Doctor Name"
              value={newDoctorName}
              onChange={(e) => setNewDoctorName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Specialization"
              value={newDoctorSpecialization}
              onChange={(e) => setNewDoctorSpecialization(e.target.value)}
            />
            <input
              type="text"
              placeholder="Time Slots (comma-separated)"
              value={newDoctorSlots}
              onChange={(e) => setNewDoctorSlots(e.target.value)}
            />
            <button onClick={() => addDoctor(expandedDepartment)}>
              Save Doctor
            </button>
            <button onClick={closeModal} className="cancel-button">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorsPage;
