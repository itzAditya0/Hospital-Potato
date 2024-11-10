// Doctors.js
import React, { useState } from "react";
import "./Styles/Doctors.css";

const DoctorsPage = () => {
    const [departments, setDepartments] = useState([
        {
            name: "Cardiology",
            doctors: [
                { name: "Dr. Smith", specialization: "Cardiologist", degree: "MD", slots: ["10:00 AM", "11:00 AM"] },
                { name: "Dr. Brown", specialization: "Cardiologist", degree: "MD", slots: ["2:00 PM", "3:00 PM"] },
            ],
        },
        {
            name: "Neurology",
            doctors: [
                { name: "Dr. Adams", specialization: "Neurologist", degree: "PhD", slots: ["12:00 PM", "1:00 PM"] },
                { name: "Dr. Clark", specialization: "Neurologist", degree: "PhD", slots: ["3:00 PM", "4:00 PM"] },
            ],
        },
        {
            name: "Orthopedics",
            doctors: [
                { name: "Dr. Wright", specialization: "Orthopedic Surgeon", degree: "MD", slots: ["9:00 AM", "10:00 AM"] },
                { name: "Dr. Lee", specialization: "Orthopedic Specialist", degree: "MD", slots: ["11:00 AM", "12:00 PM"] },
            ],
        },
        {
            name: "Pediatrics",
            doctors: [
                { name: "Dr. Martin", specialization: "Pediatrician", degree: "MD", slots: ["10:00 AM", "11:00 AM"] },
                { name: "Dr. Taylor", specialization: "Pediatric Specialist", degree: "MD", slots: ["1:00 PM", "2:00 PM"] },
            ],
        },
        {
            name: "Dermatology",
            doctors: [
                { name: "Dr. Garcia", specialization: "Dermatologist", degree: "MD", slots: ["9:00 AM", "10:30 AM"] },
                { name: "Dr. Robinson", specialization: "Skin Specialist", degree: "PhD", slots: ["2:00 PM", "3:30 PM"] },
            ],
        },
        {
            name: "Oncology",
            doctors: [
                { name: "Dr. Wilson", specialization: "Oncologist", degree: "MD", slots: ["11:00 AM", "12:00 PM"] },
                { name: "Dr. Lopez", specialization: "Cancer Specialist", degree: "PhD", slots: ["4:00 PM", "5:00 PM"] },
            ],
        },
        {
            name: "Gastroenterology",
            doctors: [
                { name: "Dr. King", specialization: "Gastroenterologist", degree: "MD", slots: ["10:00 AM", "11:00 AM"] },
                { name: "Dr. White", specialization: "GI Specialist", degree: "MD", slots: ["1:00 PM", "2:00 PM"] },
            ],
        },
        {
            name: "Pulmonology",
            doctors: [
                { name: "Dr. Harris", specialization: "Pulmonologist", degree: "MD", slots: ["11:00 AM", "12:30 PM"] },
                { name: "Dr. Young", specialization: "Respiratory Specialist", degree: "PhD", slots: ["2:00 PM", "3:00 PM"] },
            ],
        },
    ]);

    const [expandedDepartment, setExpandedDepartment] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [newDoctorName, setNewDoctorName] = useState("");
    const [newDoctorSpecialization, setNewDoctorSpecialization] = useState("");
    const [newDoctorSlots, setNewDoctorSlots] = useState("");
    const [newDepartmentName, setNewDepartmentName] = useState("");

    // Toggle department expansion
    const toggleDepartment = (index) => {
        setExpandedDepartment(expandedDepartment === index ? null : index);
    };

    // Add new department
    const addDepartment = () => {
        if (!newDepartmentName.trim()) return alert("Enter a department name.");
        setDepartments([...departments, { name: newDepartmentName, doctors: [] }]);
        setNewDepartmentName(""); // Clear input
    };

    // Show modal to add a new doctor
    const openModal = () => {
        setShowModal(true);
    };

    // Close modal
    const closeModal = () => {
        setShowModal(false);
        setNewDoctorName("");
        setNewDoctorSpecialization("");
        setNewDoctorSlots("");
    };

    // Add a new doctor to a specific department
    const addDoctor = (departmentIndex) => {
        if (!newDoctorName || !newDoctorSpecialization || !newDoctorSlots) {
            return alert("Please fill in all doctor details.");
        }

        const slots = newDoctorSlots.split(",").map((slot) => slot.trim());
        const newDoctor = {
            name: newDoctorName,
            specialization: newDoctorSpecialization,
            slots,
        };

        const updatedDepartments = [...departments];
        updatedDepartments[departmentIndex].doctors.push(newDoctor);

        setDepartments(updatedDepartments);
        closeModal();
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
                    <div key={index} className="department-card">
                        <div
                            className="department-header"
                            onClick={() => toggleDepartment(index)}
                        >
                            <h3>{dept.name}</h3>
                            <p>{dept.doctors.length} doctors</p>
                        </div>

                        {/* Expanded department section with doctor table */}
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
                                        {dept.doctors.map((doctor, i) => (
                                            <tr key={i}>
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
