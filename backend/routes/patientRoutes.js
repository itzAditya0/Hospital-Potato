// routes/patientRoutes.js
import express from "express";
import {
  getPatientProfile,
  updatePatientProfile,
} from "../controllers/patientController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/profile")
  .get(protect, authorizeRoles("patient", "admin"), getPatientProfile)
  .put(protect, authorizeRoles("patient", "admin"), updatePatientProfile);

export default router;
