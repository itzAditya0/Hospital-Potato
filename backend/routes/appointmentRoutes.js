import express from "express";
import {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAllAppointments,
} from "../controllers/appointmentController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin route to get all appointments
router.get("/all", protect, authorizeRoles("admin"), getAllAppointments);

// Set up route for fetching appointments
router.get("/", protect, authorizeRoles("patient", "doctor"), getAppointments);

// Create a new appointment (e.g., for doctors or admin)
router.post("/", protect, createAppointment);

// Update an existing appointment
router.put(
  "/:id/status",
  protect,
  authorizeRoles("doctor", "admin"),
  updateAppointment,
);

// Delete an appointment
router.delete("/:id", protect, authorizeRoles("admin"), deleteAppointment);

export default router;
