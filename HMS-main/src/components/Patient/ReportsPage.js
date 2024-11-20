// src/components/Patient/ReportsPage.js
import React, { useState, useContext } from "react";
import api from "../../api";
import "./Styles/ReportsPage.css";
import { AuthContext } from "../../context/AuthContext";

function ReportsPage() {
  const { user } = useContext(AuthContext);
  const [viewMode, setViewMode] = useState(""); // '' | 'upload' | 'view'
  const [reports, setReports] = useState([]);
  const [uploadData, setUploadData] = useState({
    reportName: "",
    doctor: "",
    visitDate: "",
    file: null,
  });

  const fetchReports = async () => {
    try {
      const response = await api.get(`/api/reports/${user._id}`);
      setReports(response.data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setUploadData({ ...uploadData, file });
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("reportName", uploadData.reportName);
    formData.append("doctor", uploadData.doctor);
    formData.append("visitDate", uploadData.visitDate);
    formData.append("file", uploadData.file);

    try {
      await api.post(`/api/reports/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Report uploaded successfully");
      fetchReports(); // Refresh the reports list
    } catch (error) {
      console.error("Error uploading report:", error);
      alert("Upload failed. Please try again.");
    }
  };

  return (
    <div className="reports-page">
      <h2>Reports</h2>
      {viewMode === "" && (
        <div className="options">
          <button onClick={() => setViewMode("view")} className="view-button">
            VIEW REPORTS
          </button>
          <button
            onClick={() => setViewMode("upload")}
            className="upload-button"
          >
            UPLOAD REPORTS
          </button>
        </div>
      )}

      {(viewMode === "upload" || viewMode === "view") && (
        <button onClick={() => setViewMode("")} className="btn-back">
          Go Back
        </button>
      )}

      {viewMode === "upload" && (
        <div className="upload-reports">
          <h3>Upload Report</h3>
          <form>
            <label>Report Name:</label>
            <input
              type="text"
              value={uploadData.reportName}
              onChange={(e) =>
                setUploadData({ ...uploadData, reportName: e.target.value })
              }
            />
            <label>Doctor Name:</label>
            <input
              type="text"
              value={uploadData.doctor}
              onChange={(e) =>
                setUploadData({ ...uploadData, doctor: e.target.value })
              }
            />
            <label>Visit Date:</label>
            <input
              type="date"
              value={uploadData.visitDate}
              onChange={(e) =>
                setUploadData({ ...uploadData, visitDate: e.target.value })
              }
            />
            <label>Upload Report (PDF):</label>
            <input type="file" accept=".pdf" onChange={handleFileUpload} />
            <button type="button" onClick={handleUpload}>
              Upload Report
            </button>
          </form>
        </div>
      )}

      {viewMode === "view" && (
        <div className="view-reports">
          <h3>My Reports</h3>
          {reports.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Visit Date</th>
                  <th>Doctor</th>
                  <th>Report Name</th>
                  <th>File</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report, index) => (
                  <tr key={index}>
                    <td>{report.visitDate}</td>
                    <td>{report.doctor}</td>
                    <td>{report.reportName}</td>
                    <td>
                      <a href={report.fileURL} download>
                        Download
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No reports available. Please upload a report.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ReportsPage;
