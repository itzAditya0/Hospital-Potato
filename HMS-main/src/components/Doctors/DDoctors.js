// src/Doctor/DoctorToday.js
import React, { useEffect, useState } from "react";
import {
  FaClipboardCheck,
  FaUserMd,
  FaClock,
  FaNotesMedical,
  FaPlus,
  FaFileAlt,
} from "react-icons/fa";
import api from "../../api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles/DDoctors.css";

const DoctorToday = () => {
  const [tasks, setTasks] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [prescriptionReminders, setPrescriptionReminders] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    const fetchTodayData = async () => {
      try {
        const [tasksResponse, appointmentsResponse, remindersResponse] =
          await Promise.all([
            api.get("/doctors/tasks/today"),
            api.get("/appointments/today"),
            api.get("/prescriptions/reminders"),
          ]);
        setTasks(tasksResponse.data);
        setAppointments(appointmentsResponse.data);
        setPrescriptionReminders(remindersResponse.data);
      } catch (error) {
        console.error("Error fetching today's data:", error);
      }
    };
    fetchTodayData();
  }, []);

  const handleTaskCompletion = async (taskId) => {
    try {
      await api.put(`/doctors/tasks/${taskId}/complete`);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, completed: true } : task,
        ),
      );
    } catch (error) {
      console.error("Error marking task as completed:", error);
    }
  };

  const handleAddTask = async () => {
    if (newTask.trim()) {
      try {
        const response = await api.post("/doctors/tasks", { task: newTask });
        setTasks([...tasks, response.data]);
        setNewTask("");
        setIsAddTaskModalOpen(false);
      } catch (error) {
        console.error("Error adding task:", error);
      }
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
        <h3>
          <FaClipboardCheck /> Tasks for Today
        </h3>
        <ul>
          {tasks.map((task) => (
            <li
              key={task.id}
              className={task.completed ? "completed-task" : ""}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleTaskCompletion(task.id)}
              />
              {task.task}
            </li>
          ))}
        </ul>
        <button
          className="add-task-btn"
          onClick={() => setIsAddTaskModalOpen(true)}
        >
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
              <button onClick={handleAddTask} className="add-task-modal-btn">
                Add Task
              </button>
              <button
                onClick={() => setIsAddTaskModalOpen(false)}
                className="close-modal-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Appointments with "View Report" */}
      <div className="appointments-container">
        <h3>
          <FaUserMd /> Today's Appointments
        </h3>
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
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.patientName}</td>
                <td>{appointment.time}</td>
                <td>{appointment.notes}</td>
                <td>
                  <button
                    className="view-report-btn"
                    onClick={() => openReportModal(appointment.report)}
                  >
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
            <button onClick={closeReportModal} className="close-modal-btn">
              Close
            </button>
          </div>
        </div>
      )}

      {/* Prescription Reminders */}
      <div className="prescription-reminders">
        <h3>
          <FaNotesMedical /> Prescription Reminders
        </h3>
        <ul>
          {prescriptionReminders.map((reminder, index) => (
            <li key={index}>
              {reminder.patient} - {reminder.medication} at {reminder.time}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DoctorToday;
