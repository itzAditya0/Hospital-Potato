// routes/doctorRoutes.js
import express from "express";
import {
  getDoctorProfile,
  updateDoctorProfile,
} from "../controllers/doctorController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/profile")
  .get(protect, authorizeRoles("doctor", "admin"), getDoctorProfile)
  .put(protect, authorizeRoles("doctor", "admin"), updateDoctorProfile);

export default router;
