// src/Doctor/ViewDocument.js
import React from "react";
import "./styles/ViewDocument.css";

const ViewDocument = () => {
    const documents = [
        { title: "Blood Test Report", date: "2024-10-01" },
        { title: "X-Ray Scan", date: "2024-09-20" },
        { title: "MRI Scan Report", date: "2024-08-15" },
    ];

    return (
        <div className="view-document-container">
            <h2>Patient Documents</h2>
            <ul className="document-list">
                {documents.map((doc, index) => (
                    <li key={index} className="document-item">
                        <p>
                            <strong>{doc.title}</strong> - {doc.date}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewDocument;
