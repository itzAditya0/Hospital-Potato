// controllers/adminController.js
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

// getAllDoctors function
export const getAllDoctors = asyncHandler(async (req, res) => {
  const doctors = await User.find({ role: "doctor" }).select("-password");
  res.json(doctors);
});

// Controller function to get all patients
export const getAllPatients = asyncHandler(async (req, res) => {
  const patients = await User.find({ role: "patient" }).select("-password");
  res.json(patients);
});

// Admin-only: Delete a user by ID
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.deleteOne(); // Use deleteOne() instead of remove()
    res.json({ message: "User deleted successfully" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// Admin-only: Register a new doctor
export const adminRegisterDoctor = asyncHandler(async (req, res) => {
  const { name, email, username, password } = req.body;

  // Ensure this is an admin-only endpoint
  if (req.user.role !== "admin") {
    res.status(403);
    throw new Error("Access denied");
  }

  // Check if the doctor already exists
  const doctorExists = await User.findOne({ email });
  if (doctorExists) {
    res.status(400).json({ message: "Doctor already exists" });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const doctor = await User.create({
    name,
    email,
    username,
    password: hashedPassword,
    role: "doctor",
  });

  res.status(201).json(doctor);
});

// Admin-only: Get all users
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// Admin-only: Update user role by ID
export const updateUserRole = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.role = req.body.role || user.role;
    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
