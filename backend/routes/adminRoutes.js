import express from "express";
import {
  getAllUsers,
  getAllPatients,
  deleteUser,
  updateUserRole,
  adminRegisterDoctor,
  getAllDoctors, // Ensure getAllDoctors is exported in adminController.js
} from "../controllers/adminController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin routes
router.get("/users", protect, authorizeRoles("admin"), getAllUsers);
router.delete("/user/:id", protect, authorizeRoles("admin"), deleteUser);
router.put("/user/:id/role", protect, authorizeRoles("admin"), updateUserRole);
router.get("/doctors", protect, authorizeRoles("admin"), getAllDoctors);
router.get("/patients", protect, authorizeRoles("admin"), getAllPatients);
router.post(
  "/register-doctor",
  protect,
  authorizeRoles("admin"),
  adminRegisterDoctor,
);
router.delete("/delete-user/:id", protect, authorizeRoles("admin"), deleteUser);

export default router;
