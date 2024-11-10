// patientController.js
import asyncHandler from "express-async-handler";
import Appointment from "../models/appointmentModel.js";
import Doctor from "../models/doctorModel.js";

// View patient profile (already handled in userController with getProfile)

// Book an appointment with a doctor
export const bookAppointment = asyncHandler(async (req, res) => {
  const patientId = req.user._id;
  const { doctorId, date, reason } = req.body;

  // Check if doctor exists
  const doctor = await Doctor.findById(doctorId);
  if (!doctor) {
    res.status(404);
    throw new Error("Doctor not found");
  }

  // Create an appointment
  const appointment = new Appointment({
    patient: patientId,
    doctor: doctorId,
    date,
    reason,
  });

  const createdAppointment = await appointment.save();
  res.status(201).json(createdAppointment);
});
