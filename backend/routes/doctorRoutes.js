import express from "express";
import {
  createDoctor,
  getAllDoctors,
  viewAppointments,
  managePatientRecords,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
  getDoctorAvailability,
  addAppointmentToDoctor,
} from "../controllers/doctorController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Route to create a new doctor - Admin only
router.post("/", protect, authorizeRoles("admin"), createDoctor);

// Route to get all doctors (with optional filtering by department)
router.get("/", protect, getAllDoctors);

// Route to get a specific doctor by ID
router.get("/:id", protect, getDoctorById);

// Route to update doctor details - Admin only
router.put("/:id", protect, authorizeRoles("admin"), updateDoctor);

// Route to delete a doctor - Admin only
router.delete("/:id", protect, authorizeRoles("admin"), deleteDoctor);

// Route to view appointments for a specific doctor
router.get("/:id/appointments", protect, viewAppointments);

// Route to manage/update patient records by doctor
router.put("/:id/patient-records", protect, managePatientRecords);

// Route to get doctor's availability
router.get("/:id/availability", protect, getDoctorAvailability);

// Route to assign an appointment to a doctor - Admin only
router.post(
  "/assign-appointment",
  protect,
  authorizeRoles("admin"),
  addAppointmentToDoctor,
);

export default router;
