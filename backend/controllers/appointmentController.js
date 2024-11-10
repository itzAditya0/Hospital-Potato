import asyncHandler from "express-async-handler";
import Appointment from "../models/appointmentModel.js";

// Get all appointments (Admin-only access)
export const getAllAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find();
  res.json(appointments);
});

// Get appointments for a specific user (e.g., patient or doctor)
export const getAppointments = asyncHandler(async (req, res) => {
  const { user } = req;
  const appointments = await Appointment.find({ user: user._id });
  res.json(appointments);
});

// Create a new appointment
export const createAppointment = asyncHandler(async (req, res) => {
  const { doctorId, patientId, date, time, notes } = req.body;

  const newAppointment = await Appointment.create({
    doctorId,
    patientId,
    date,
    time,
    notes,
  });

  if (newAppointment) {
    res.status(201).json(newAppointment);
  } else {
    res.status(400);
    throw new Error("Invalid appointment data");
  }
});

// Update an appointment
export const updateAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);

  if (appointment) {
    appointment.date = req.body.date || appointment.date;
    appointment.time = req.body.time || appointment.time;
    appointment.notes = req.body.notes || appointment.notes;

    const updatedAppointment = await appointment.save();
    res.json(updatedAppointment);
  } else {
    res.status(404);
    throw new Error("Appointment not found");
  }
});

// Delete an appointment
export const deleteAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);

  if (appointment) {
    await appointment.remove();
    res.json({ message: "Appointment removed" });
  } else {
    res.status(404);
    throw new Error("Appointment not found");
  }
});
