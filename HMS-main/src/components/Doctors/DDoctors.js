// DDoctors.js
import React from "react";
import "./styles/DDoctors.css";

const DDoctors = () => {
    const tasks = [
        { title: "Complete patient evaluations", priority: "High" },
        { title: "Review surgery schedules", priority: "Medium" },
        { title: "Follow up on lab results", priority: "Low" },
    ];

    return (
        <div className="doctor-tasks-container">
            <h2>Doctor's Tasks</h2>
            <ul className="task-list">
                {tasks.map((task, index) => (
                    <li
                        key={index}
                        className={`task-item ${task.priority.toLowerCase()}`}
                    >
                        {task.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DDoctors;
