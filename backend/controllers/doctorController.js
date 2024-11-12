import asyncHandler from "express-async-handler";
import Doctor from "../models/doctorModel.js";
import Appointment from "../models/appointmentModel.js";
import Patient from "../models/patientModel.js";

// Create a new doctor (Admin only)
export const createDoctor = asyncHandler(async (req, res) => {
  const {
    name,
    specialization,
    email,
    phone,
    address,
    availableDays,
    availableTime,
    department,
  } = req.body;

  const doctorExists = await Doctor.findOne({ email });
  if (doctorExists) {
    res.status(400);
    throw new Error("Doctor with this email already exists");
  }

  const doctor = await Doctor.create({
    name,
    specialization,
    email,
    phone,
    address,
    availableDays,
    availableTime,
    department,
  });

  res.status(201).json(doctor);
});

// Get all doctors with optional department filter
export const getAllDoctors = asyncHandler(async (req, res) => {
  const { department } = req.query;
  let query = department ? { department } : {};

  const doctors = await Doctor.find(query).select("-appointments -__v");
  res.json(doctors);
});

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

  patient.diagnosis = diagnosis || patient.diagnosis;
  patient.treatmentPlan = treatmentPlan || patient.treatmentPlan;
  patient.notes = notes || patient.notes;

  const updatedPatient = await patient.save();
  res.json(updatedPatient);
});

// Get doctor availability
export const getDoctorAvailability = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);

  if (doctor) {
    res.json({
      availableDays: doctor.availableDays,
      availableTime: doctor.availableTime,
    });
  } else {
    res.status(404);
    throw new Error("Doctor not found");
  }
});

// Assign an appointment to a doctor (Admin only)
export const addAppointmentToDoctor = asyncHandler(async (req, res) => {
  const { doctorId, appointmentId } = req.body;

  const doctor = await Doctor.findById(doctorId);
  const appointment = await Appointment.findById(appointmentId);

  if (doctor && appointment) {
    doctor.appointments.push(appointmentId);
    await doctor.save();
    res.json({ message: "Appointment assigned to doctor" });
  } else {
    res.status(404);
    throw new Error("Doctor or Appointment not found");
  }
});

// Update a doctor's information (Admin only)
export const updateDoctor = asyncHandler(async (req, res) => {
  const {
    name,
    specialization,
    email,
    phone,
    address,
    availableDays,
    availableTime,
    department,
  } = req.body;

  const doctor = await Doctor.findById(req.params.id);

  if (doctor) {
    doctor.name = name || doctor.name;
    doctor.specialization = specialization || doctor.specialization;
    doctor.email = email || doctor.email;
    doctor.phone = phone || doctor.phone;
    doctor.address = address || doctor.address;
    doctor.availableDays = availableDays || doctor.availableDays;
    doctor.availableTime = availableTime || doctor.availableTime;
    doctor.department = department || doctor.department;

    const updatedDoctor = await doctor.save();
    res.json(updatedDoctor);
  } else {
    res.status(404);
    throw new Error("Doctor not found");
  }
});

// Delete a doctor (Admin only)
export const deleteDoctor = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);

  if (doctor) {
    await doctor.remove();
    res.json({ message: "Doctor removed successfully" });
  } else {
    res.status(404);
    throw new Error("Doctor not found");
  }
});
