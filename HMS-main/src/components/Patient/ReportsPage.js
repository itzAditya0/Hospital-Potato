import React, { useState } from "react";
import "./Styles/ReportsPage.css";

function ReportsPage() {
  const [viewMode, setViewMode] = useState(""); // '' | 'upload' | 'view'
  const [reports, setReports] = useState([
    {
      visitDate: "2024-01-10",
      doctor: "Dr. John",
      reportName: "Blood Test",
      file: null,
    },
    {
      visitDate: "2024-02-15",
      doctor: "Dr. Joel",
      reportName: "X-Ray",
      file: null,
    },
  ]);
  const [uploadData, setUploadData] = useState({
    reportName: "",
    doctor: "",
    visitDate: "",
    file: null,
  });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setUploadData({ ...uploadData, file });
  };

  const handleUpload = () => {
    if (
      uploadData.reportName &&
      uploadData.doctor &&
      uploadData.visitDate &&
      uploadData.file
    ) {
      setReports([...reports, { ...uploadData }]);
      setUploadData({ reportName: "", doctor: "", visitDate: "", file: null });
      alert("Report uploaded successfully");
    } else {
      alert("Please fill all fields and upload a file.");
    }
  };

  const goBack = () => {
    setViewMode(""); // Reset viewMode to show the initial options
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

      {viewMode !== "" && (
        <button onClick={goBack} className="back-button">
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
                      {report.file ? (
                        <a href={URL.createObjectURL(report.file)} download>
                          Download
                        </a>
                      ) : (
                        "Pending Upload"
                      )}
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
