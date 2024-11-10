// src/Doctor/EducationContent.js
import React from "react";
import "./styles/EducationContent.css";

const EducationContent = () => {
    const articles = [
        {
            title: "Heart Disease Prevention",
            date: "2024-10-25",
            summary: "Tips on preventing heart disease.",
        },
        {
            title: "Understanding Diabetes",
            date: "2024-10-18",
            summary: "An overview of managing diabetes effectively.",
        },
        {
            title: "Mental Health Awareness",
            date: "2024-09-30",
            summary: "The importance of mental health care.",
        },
    ];

    return (
        <div className="education-content-container">
            <h2>Educational Articles</h2>
            <ul className="article-list">
                {articles.map((article, index) => (
                    <li key={index} className="article-item">
                        <h3>{article.title}</h3>
                        <p>
                            <em>{article.date}</em>
                        </p>
                        <p>{article.summary}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EducationContent;
