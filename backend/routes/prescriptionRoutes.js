// prescriptionRoutes.js
import express from "express";
import {
  uploadPrescription,
  getPrescriptionsByPatient,
  getPrescriptionsByDoctor,
  deletePrescription,
} from "../controllers/prescriptionController.js";
import { protect } from "../middleware/authMiddleware.js";
import multer from "multer";

const router = express.Router();

// Configure Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // ensure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Route for uploading a prescription
router.post("/upload", protect, upload.single("file"), uploadPrescription);
// Route to get all prescriptions for a specific patient
router.get("/patient/:patientId", getPrescriptionsByPatient);
// Route for fetching prescriptions by doctor
router.get("/doctor/:doctorId", getPrescriptionsByDoctor);
// Add your delete route here
router.delete("/:prescriptionId", protect, deletePrescription);

export default router;
