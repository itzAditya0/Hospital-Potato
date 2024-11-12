import express from "express";
import {
  getUserNotifications,
  markAsRead,
  createNotification,
} from "../controllers/notificationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Route to get all notifications for the logged-in user
router.get("/", protect, getUserNotifications);

// Route to mark a notification as read
router.put("/:id/read", protect, markAsRead);

// Route to create a new notification (Admin or system usage)
router.post("/", protect, createNotification);

export default router;
