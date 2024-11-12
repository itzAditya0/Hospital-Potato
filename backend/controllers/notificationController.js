import asyncHandler from "express-async-handler";
import Notification from "../models/notificationModel.js";

// Fetch all notifications for a specific user
export const getUserNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ user: req.user._id }).sort({
    createdAt: -1,
  });
  res.json(notifications);
});

// Mark a specific notification as read
export const markAsRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (!notification) {
    res.status(404);
    throw new Error("Notification not found");
  }

  notification.read = true;
  await notification.save();
  res.json({ message: "Notification marked as read" });
});

// Create a new notification (for example, upon an appointment update)
export const createNotification = asyncHandler(async (req, res) => {
  const { user, message, type } = req.body;

  const notification = new Notification({
    user,
    message,
    type,
  });

  await notification.save();
  res.status(201).json(notification);
});
