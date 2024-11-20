// src/Doctor/TaskList.js
import React, { useEffect, useState } from "react";
import api from "../../api";
import "./styles/TaskList.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get("/doctors/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
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
      console.error("Error updating task status:", error);
    }
  };

  return (
    <div className="task-list-container">
      <h2>Tasks for Today</h2>
      <ul className="task-list">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`task-item ${task.completed ? "completed" : ""}`}
          >
            <span>{task.title}</span>
            <button
              onClick={() => handleTaskCompletion(task.id)}
              disabled={task.completed}
              className="complete-task-btn"
            >
              {task.completed ? "Completed" : "Mark as Done"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
