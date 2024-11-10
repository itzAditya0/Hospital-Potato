// doctorController.js
import asyncHandler from "express-async-handler";
import Appointment from "../models/appointmentModel.js";
import Patient from "../models/patientModel.js";

// View appointments for a specific doctor
export const viewAppointments = asyncHandler(async (req, res) => {
  const doctorId = req.user._id;

  const appointments = await Appointment.find({ doctor: doctorId })
    .populate("patient", "name email")
    .sort({ date: 1 });

  res.json(appointments);
});

// Manage (update) patient records
export const managePatientRecords = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { diagnosis, treatmentPlan, notes } = req.body;

  const patient = await Patient.findById(id);
  if (!patient) {
    res.status(404);
    throw new Error("Patient not found");
  }

  // Update patient record with diagnosis, treatment plan, etc.
  patient.diagnosis = diagnosis || patient.diagnosis;
  patient.treatmentPlan = treatmentPlan || patient.treatmentPlan;
  patient.notes = notes || patient.notes;

  const updatedPatient = await patient.save();
  res.json(updatedPatient);
});
