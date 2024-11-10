// src/Doctor/TaskList.js
import React from "react";
import "./styles/TaskList.css";

const TaskList = () => {
    const tasks = [
        { title: "Review lab results", priority: "High", completed: false },
        {
            title: "Follow up with patients",
            priority: "Medium",
            completed: true,
        },
        {
            title: "Prepare discharge summary",
            priority: "Low",
            completed: false,
        },
    ];

    return (
        <div className="task-list-container">
            <h2>Tasks</h2>
            <ul className="task-list">
                {tasks.map((task, index) => (
                    <li
                        key={index}
                        className={`task-item ${task.priority.toLowerCase()}`}
                    >
                        {task.title} -{" "}
                        {task.completed ? "Completed" : "Pending"}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
