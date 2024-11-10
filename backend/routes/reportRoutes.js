// routes/reportRoutes.js
import express from "express";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
import { uploadReport, getReports } from "../controllers/reportController.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("doctor", "admin"), uploadReport);
router.get(
  "/:patientId",
  protect,
  authorizeRoles("doctor", "admin", "patient"),
  getReports,
);

export default router;
