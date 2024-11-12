import asyncHandler from "express-async-handler";
import Prescription from "../models/prescriptionModel.js";
import multer from "multer";

// Configure Multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Controller for uploading prescription
export const uploadPrescription = asyncHandler(async (req, res) => {
  const { patientId, description } = req.body;
  const doctorId = req.user._id;

  if (req.user.role !== "doctor") {
    res.status(403);
    throw new Error("Only doctors can upload prescriptions");
  }

  const prescription = new Prescription({
    doctor: doctorId,
    patient: patientId,
    description,
    fileUrl: req.file.path,
  });

  await prescription.save();

  res.status(201).json(prescription);
});

// Get all prescriptions for a specific patient
export const getPrescriptionsByPatient = asyncHandler(async (req, res) => {
  const { patientId } = req.params;
  const prescriptions = await Prescription.find({ patient: patientId })
    .populate("doctor", "name email")
    .populate("patient", "name email");
  if (!prescriptions || prescriptions.length === 0) {
    res.status(404);
    throw new Error("No prescriptions found for this patient");
  }
  res.json(prescriptions);
});

// Get all prescriptions created by a specific doctor
export const getPrescriptionsByDoctor = asyncHandler(async (req, res) => {
  const { doctorId } = req.params;
  const prescriptions = await Prescription.find({ doctor: doctorId })
    .populate("doctor", "name email")
    .populate("patient", "name email");
  if (!prescriptions || prescriptions.length === 0) {
    res.status(404);
    throw new Error("No prescriptions found for this doctor");
  }
  res.json(prescriptions);
});

// Delete a Prescription
export const deletePrescription = asyncHandler(async (req, res) => {
  const { prescriptionId } = req.params;
  const userId = req.user._id;

  // Find the prescription by ID
  const prescription = await Prescription.findById(prescriptionId);

  // Check if prescription exists
  if (!prescription) {
    res.status(404);
    throw new Error("Prescription not found");
  }

  // Check if the user is the doctor who created the prescription or an admin
  if (
    prescription.doctor.toString() !== userId.toString() &&
    req.user.role !== "admin"
  ) {
    res.status(403);
    throw new Error("Not authorized to delete this prescription");
  }

  // Delete the prescription
  await Prescription.findByIdAndDelete(prescriptionId);

  res.status(200).json({
    message: "Prescription deleted successfully",
  });
});

export { upload };
