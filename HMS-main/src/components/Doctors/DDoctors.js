// src/components/Doctors/DoctorToday.js
import React, { useState } from "react";
import { FaClipboardCheck, FaUserMd, FaClock, FaNotesMedical, FaPrescriptionBottleAlt, FaCalendarDay, FaPlus, FaFileAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles/DDoctors.css";

const DoctorToday = () => {
    const [tasks, setTasks] = useState([
        { id: 1, task: "Complete morning rounds in the ICU", completed: false },
        { id: 2, task: "Attend team meeting with resident doctors", completed: false },
        { id: 3, task: "Review patient discharge summaries", completed: false },
    ]);
    const [appointments, setAppointments] = useState([
        { id: 1, patientName: "Alice Brown", time: "10:00 AM", notes: "New admission, check initial vitals", report: "Blood Test Report" },
        { id: 2, patientName: "Tom White", time: "11:30 AM", notes: "Follow-up on lab results", report: "X-Ray Report" },
        { id: 3, patientName: "Lucy Black", time: "1:00 PM", notes: "Post-surgery follow-up", report: "CT Scan Report" },
    ]);
    const [prescriptionReminders] = useState([
        { id: 1, medication: "Amoxicillin 500mg", patient: "Alice Brown", time: "10:00 AM" },
        { id: 2, medication: "Ibuprofen 200mg", patient: "Tom White", time: "12:00 PM" },
    ]);
    const [notes, setNotes] = useState("");
    const [calendarDate, setCalendarDate] = useState(new Date());

    // Task addition modal
    const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
    const [newTask, setNewTask] = useState("");

    // Report viewing modal
    const [selectedReport, setSelectedReport] = useState(null);

    const handleTaskCompletion = (id) => {
        setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
    };

    const handleAddTask = () => {
        if (newTask.trim()) {
            setTasks([...tasks, { id: tasks.length + 1, task: newTask, completed: false }]);
            setNewTask("");
            setIsAddTaskModalOpen(false);
        }
    };

    const openReportModal = (report) => {
        setSelectedReport(report);
    };

    const closeReportModal = () => {
        setSelectedReport(null);
    };

    return (
        <div className="doctor-today-container">
            <h2>Today's Overview</h2>
            <p className="date-display">{new Date().toDateString()}</p>

            {/* Task List */}
            <div className="tasks-container">
                <h3><FaClipboardCheck /> Tasks for Today</h3>
                <ul>
                    {tasks.map(task => (
                        <li key={task.id} className={task.completed ? "completed-task" : ""}>
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => handleTaskCompletion(task.id)}
                            />
                            {task.task}
                        </li>
                    ))}
                </ul>
                <button className="add-task-btn" onClick={() => setIsAddTaskModalOpen(true)}>
                    <FaPlus /> Add Task
                </button>
            </div>

            {/* Add Task Modal */}
            {isAddTaskModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Add New Task</h3>
                        <textarea
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            placeholder="Enter the task description..."
                            rows="3"
                        />
                        <div className="modal-actions">
                            <button onClick={handleAddTask} className="add-task-modal-btn">Add Task</button>
                            <button onClick={() => setIsAddTaskModalOpen(false)} className="close-modal-btn">Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Appointments with "View Report" */}
            <div className="appointments-container">
                <h3><FaUserMd /> Today's Appointments</h3>
                <table className="appointments-table">
                    <thead>
                        <tr>
                            <th>Patient Name</th>
                            <th>Time</th>
                            <th>Notes</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map(appointment => (
                            <tr key={appointment.id}>
                                <td>{appointment.patientName}</td>
                                <td>{appointment.time}</td>
                                <td>{appointment.notes}</td>
                                <td>
                                    <button className="view-report-btn" onClick={() => openReportModal(appointment.report)}>
                                        <FaFileAlt /> View Report
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Report Viewing Modal */}
            {selectedReport && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Patient Report</h3>
                        <p>{selectedReport}</p>
                        <button onClick={closeReportModal} className="close-modal-btn">Close</button>
                    </div>
                </div>
            )}

            {/* Quick Notes */}
            <div className="notes-container">
                <h3><FaNotesMedical /> Quick Notes</h3>
                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add any quick reminders or notes for today..."
                ></textarea>
            </div>

        
        </div>
    );
};

export default DoctorToday;
