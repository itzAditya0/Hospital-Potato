import React, { useState, useEffect } from "react";
import "./Styles/PPrescriptions.css";

const Prescriptions = () => {
  const [visits, setVisits] = useState([
    {
      id: 1,
      doctor: "Dr. Smith",
      visitDate: "2024-01-10",
      prescriptions: [
        {
          id: 1,
          medicine: "Paracetamol",
          status: "Active",
          duration: 7,
          startDate: new Date(),
          tookDose: false,
        },
      ],
    },
    {
      id: 2,
      doctor: "Dr. John",
      visitDate: "2024-02-15",
      prescriptions: [
        {
          id: 2,
          medicine: "Ibuprofen",
          status: "Active",
          duration: 3,
          startDate: new Date(),
          tookDose: false,
        },
      ],
    },
  ]);
  const [selectedVisit, setSelectedVisit] = useState(null);

  useEffect(() => {
    if (selectedVisit) {
      const calculateRemainingDays = () => {
        setVisits((prevVisits) =>
          prevVisits.map((visit) => ({
            ...visit,
            prescriptions: visit.prescriptions.map((prescription) => {
              const currentDate = new Date();
              const startDate = new Date(prescription.startDate);
              const daysPassed = Math.floor(
                (currentDate - startDate) / (1000 * 3600 * 24)
              );
              const remainingDuration = prescription.duration - daysPassed;
              return remainingDuration > 0
                ? { ...prescription, duration: remainingDuration }
                : {
                    ...prescription,
                    duration: 0,
                    status: "Inactive",
                    tookDose: true,
                  };
            }),
          }))
        );
      };
      calculateRemainingDays();
    }
  }, [selectedVisit]);

  const handleDoseTaken = (visitId, prescriptionId) => {
    setVisits(
      visits.map((visit) =>
        visit.id === visitId
          ? {
              ...visit,
              prescriptions: visit.prescriptions.map((prescription) =>
                prescription.id === prescriptionId
                  ? { ...prescription, tookDose: true }
                  : prescription
              ),
            }
          : visit
      )
    );
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
              <tr key={visit.id}>
                <td>{visit.doctor}</td>
                <td>{visit.visitDate}</td>
                <td>
                  <button
                    className="btn-view-prescriptions"
                    onClick={() => setSelectedVisit(visit.id)}
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
            {visits.find((v) => v.id === selectedVisit).doctor}
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
                .find((visit) => visit.id === selectedVisit)
                .prescriptions.map((prescription) => (
                  <tr key={prescription.id}>
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
                          handleDoseTaken(selectedVisit, prescription.id)
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

export default Prescriptions;
