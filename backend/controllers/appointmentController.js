import asyncHandler from "express-async-handler";
import Appointment from "../models/appointmentModel.js";

// Get all appointments (for admin or general purpose)
export const getAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find()
    .populate("patient", "name email")
    .populate("doctor", "name specialty");
  res.json(appointments);
});

// Controller to get all appointments (Admin view)
export const getAllAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find()
    .populate("patient", "name email")
    .populate("doctor", "name specialty");
  res.json(appointments);
});

// Get all appointments for a specific patient
export const getAppointmentsForPatient = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({ patient: req.user._id })
    .populate("doctor", "name specialty")
    .exec();
  res.json(appointments);
});

// Get all appointments for a specific doctor
export const getAppointmentsForDoctor = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({ doctor: req.user._id })
    .populate("patient", "name age")
    .exec();
  res.json(appointments);
});

// Create a new appointment
export const createAppointment = asyncHandler(async (req, res) => {
  const { doctorId, patientId, appointmentDate, reason } = req.body;

  if (!doctorId || !patientId || !appointmentDate) {
    res.status(400);
    throw new Error("Doctor, patient, and appointment date are required.");
  }

  const appointment = await Appointment.create({
    doctor: doctorId,
    patient: patientId,
    appointmentDate,
    reason,
  });

  res.status(201).json(appointment);
});

// Update an appointment
export const updateAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);

  if (appointment) {
    appointment.appointmentDate =
      req.body.appointmentDate || appointment.appointmentDate;
    appointment.reason = req.body.reason || appointment.reason;
    appointment.status = req.body.status || appointment.status;

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
