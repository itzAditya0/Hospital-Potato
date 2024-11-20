// src/components/Patient/PPrescriptions.js
import React, { useState, useEffect, useContext } from "react";
import api from "../../api";
import "./Styles/PPrescriptions.css";
import { AuthContext } from "../../context/AuthContext";

const PPrescriptions = () => {
  const { user } = useContext(AuthContext);
  const [visits, setVisits] = useState([]);
  const [selectedVisit, setSelectedVisit] = useState(null);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await api.get(`/api/prescriptions/${user._id}`);
        setVisits(response.data);
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
      }
    };
    fetchPrescriptions();
  }, [user]);

  const handleDoseTaken = async (visitId, prescriptionId) => {
    try {
      await api.patch(
        `/api/prescriptions/${user._id}/${visitId}/${prescriptionId}`,
        { tookDose: true },
      );
      setVisits((prevVisits) =>
        prevVisits.map((visit) =>
          visit._id === visitId
            ? {
                ...visit,
                prescriptions: visit.prescriptions.map((prescription) =>
                  prescription._id === prescriptionId
                    ? { ...prescription, tookDose: true }
                    : prescription,
                ),
              }
            : visit,
        ),
      );
    } catch (error) {
      console.error("Error updating dose status:", error);
    }
  };

  return (
    <div className="prescriptions-content">
      <h2>My Visits</h2>
      {!selectedVisit ? (
        <table>
          <thead>
            <tr>
              <th>Doctor</th>
              <th>Visit Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {visits.map((visit) => (
              <tr key={visit._id}>
                <td>{visit.doctor}</td>
                <td>{visit.visitDate}</td>
                <td>
                  <button
                    className="btn-view-prescriptions"
                    onClick={() => setSelectedVisit(visit._id)}
                  >
                    View Prescriptions
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>
          <button onClick={() => setSelectedVisit(null)} className="btn-back">
            Back to Visits
          </button>
          <h2>
            Prescriptions for{" "}
            {visits.find((v) => v._id === selectedVisit).doctor}
          </h2>
          <table>
            <thead>
              <tr>
                <th>Medicine</th>
                <th>Status</th>
                <th>Duration</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {visits
                .find((visit) => visit._id === selectedVisit)
                .prescriptions.map((prescription) => (
                  <tr key={prescription._id}>
                    <td>{prescription.medicine}</td>
                    <td>{prescription.status}</td>
                    <td>
                      <div
                        className="progress-bar"
                        title={`${prescription.duration} days left`}
                      >
                        {prescription.duration} days left
                      </div>
                    </td>
                    <td>
                      <button
                        className="btn-dose"
                        onClick={() =>
                          handleDoseTaken(selectedVisit, prescription._id)
                        }
                        disabled={
                          prescription.tookDose || prescription.duration === 0
                        }
                      >
                        {prescription.tookDose ? "Done" : "Take Dose"}
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PPrescriptions;
