import React, { useState } from 'react';
import './Styles/PEducationContent.css';

const initialContentData = [
    { id: 1, title: "Cardiology Basics", description: "An introductory course on cardiology.", file: "Cardiology_Basics.pdf" },
    { id: 2, title: "Advanced Neurology", description: "A detailed course on neurology.", file: "Neurology_Advanced.pdf" },
    { id: 3, title: "Pediatrics Update", description: "New developments in pediatrics.", file: null }
];

const EducationContentPage = () => {
    const [content] = useState(initialContentData);

    return (
        <div className="education-content">
            <h2>Education & Training Resources</h2>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Download/View</th>
                    </tr>
                </thead>
                <tbody>
                    {content.map(item => (
                        <tr key={item.id}>
                            <td>{item.title}</td>
                            <td>{item.description}</td>
                            <td>
                                {item.file ? (
                                    <a href={`/downloads/${item.file}`} className="btn-view" download={item.file}>
                                        View/Download
                                    </a>
                                ) : (
                                    <span>No file uploaded yet</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EducationContentPage;