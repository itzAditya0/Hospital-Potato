import React, { useState, useEffect } from "react";
import "./Styles/PatientOPDIPD.css";

const PatientOPDIPD = () => {
  const [activeTab, setActiveTab] = useState("opd");
  const [opdAppointments, setOpdAppointments] = useState([]);
  const [ipdAdmissions, setIpdAdmissions] = useState([]);
  const [opdBilling, setOpdBilling] = useState([]);
  const [ipdBilling, setIpdBilling] = useState([]);
  const [loading, setLoading] = useState(true);

  // Placeholder fetch functions for viewing only
  useEffect(() => {
    fetchOpdData();
    fetchIpdData();
    setLoading(false);
  }, []);

  const fetchOpdData = () => {
    // Simulated data retrieval, replace with actual API calls
    setOpdAppointments([
      {
        id: 1,
        date: "2024-11-10",
        doctor: "Dr. John Doe",
        department: "Cardiology",
        status: "Confirmed",
      },
      {
        id: 2,
        date: "2024-11-12",
        doctor: "Dr. Sarah Lee",
        department: "Neurology",
        status: "Pending",
      },
    ]);
    setOpdBilling([
      { id: 1, date: "2024-11-10", amount: "$100", status: "Paid" },
      { id: 2, date: "2024-11-12", amount: "$80", status: "Pending" },
    ]);
  };

  const fetchIpdData = () => {
    // Simulated data retrieval, replace with actual API calls
    setIpdAdmissions([
      {
        id: 1,
        admissionDate: "2024-11-01",
        dischargeDate: "2024-11-05",
        department: "Orthopedics",
        doctor: "Dr. Michael Smith",
        status: "Discharged",
      },
      {
        id: 2,
        admissionDate: "2024-11-06",
        dischargeDate: "-",
        department: "Pediatrics",
        doctor: "Dr. Emily Brown",
        status: "Ongoing",
      },
    ]);
    setIpdBilling([
      { id: 1, date: "2024-11-01", amount: "$500", status: "Paid" },
      { id: 2, date: "2024-11-06", amount: "$300", status: "Ongoing" },
    ]);
  };

  return (
    <div className="patient-opd-ipd">
      <h2>Outpatient and Inpatient Department</h2>

      {/* Tabs for OPD/IPD selection */}
      <div className="tabs">
        <button
          className={activeTab === "opd" ? "active" : ""}
          onClick={() => setActiveTab("opd")}
        >
          Outpatient (OPD)
        </button>
        <button
          className={activeTab === "ipd" ? "active" : ""}
          onClick={() => setActiveTab("ipd")}
        >
          Inpatient (IPD)
        </button>
      </div>

      {/* Content Section */}
      {loading ? (
        <p>Loading data...</p>
      ) : activeTab === "opd" ? (
        <div className="opd-section">
          <h3>Upcoming OPD Appointments</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Doctor</th>
                <th>Department</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {opdAppointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.date}</td>
                  <td>{appointment.doctor}</td>
                  <td>{appointment.department}</td>
                  <td>{appointment.status}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>Billing Overview</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {opdBilling.map((bill) => (
                <tr key={bill.id}>
                  <td>{bill.date}</td>
                  <td>{bill.amount}</td>
                  <td>{bill.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="ipd-section">
          <h3>Admission Details</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Admission Date</th>
                <th>Discharge Date</th>
                <th>Department</th>
                <th>Doctor</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {ipdAdmissions.map((admission) => (
                <tr key={admission.id}>
                  <td>{admission.admissionDate}</td>
                  <td>{admission.dischargeDate}</td>
                  <td>{admission.department}</td>
                  <td>{admission.doctor}</td>
                  <td>{admission.status}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>Billing Overview</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {ipdBilling.map((bill) => (
                <tr key={bill.id}>
                  <td>{bill.date}</td>
                  <td>{bill.amount}</td>
                  <td>{bill.status}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>Discharge Planning</h3>
          <p>
            For your ongoing admission, the discharge plan will be provided once
            confirmed by the doctor.
          </p>
        </div>
      )}
    </div>
  );
};

export default PatientOPDIPD;
