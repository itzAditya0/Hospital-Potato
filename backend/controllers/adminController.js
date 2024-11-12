import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import Doctor from "../models/doctorModel.js";

// Get all doctors (with optional department filtering)
export const getAllDoctors = asyncHandler(async (req, res) => {
  const { department } = req.query;
  const filter = department ? { department } : {};
  const doctors = await Doctor.find(filter).select("-password");
  res.json(doctors);
});

// Get all patients
export const getAllPatients = asyncHandler(async (req, res) => {
  const patients = await User.find({ role: "patient" }).select("-password");
  res.json(patients);
});

// Admin-only: Delete a user by ID
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.deleteOne();
    res.json({ message: "User deleted successfully" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// Admin-only: Register a new doctor with additional details
export const adminRegisterDoctor = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    username,
    password,
    department,
    specialization,
    phone,
    address,
  } = req.body;

  // Check for role-based access
  if (req.user.role !== "admin") {
    res.status(403);
    throw new Error("Access denied");
  }

  // Verify required fields
  if (
    !name ||
    !email ||
    !username ||
    !password ||
    !specialization ||
    !department
  ) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }

  // Ensure doctor uniqueness
  const doctorExists = await User.findOne({ email });
  if (doctorExists) {
    res.status(400).json({ message: "Doctor already exists" });
    return;
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create doctor
  const doctor = await Doctor.create({
    name,
    email,
    username,
    password: hashedPassword,
    role: "doctor",
    department,
    specialization,
    phone,
    address,
  });

  res.status(201).json(doctor);
});

// Admin-only: Get all users
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password");
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
