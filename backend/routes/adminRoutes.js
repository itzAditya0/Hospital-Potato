// routes/adminRoutes.js
import express from "express";
import {
  getAllUsers,
  deleteUser,
  updateUserRole,
} from "../controllers/adminController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/users", protect, authorizeRoles("admin"), getAllUsers);
router.delete("/user/:id", protect, authorizeRoles("admin"), deleteUser);
router.put("/user/:id/role", protect, authorizeRoles("admin"), updateUserRole);

export default router;
