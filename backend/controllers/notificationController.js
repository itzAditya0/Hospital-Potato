// controllers/notificationController.js
import asyncHandler from "express-async-handler";
import Notification from "../models/notificationModel.js";

// Get notifications for a user
export const getUserNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ user: req.user._id });
  res.json(notifications);
});

// Mark a notification as read
export const markNotificationAsRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (notification) {
    notification.isRead = true;
    await notification.save();
    res.json(notification);
  } else {
    res.status(404);
    throw new Error("Notification not found");
  }
});
