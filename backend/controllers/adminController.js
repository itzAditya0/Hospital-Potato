import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// Get all doctors
export const getAllDoctors = asyncHandler(async (req, res) => {
  const doctors = await User.find({ role: "doctor" }).select("-password");
  res.json(doctors);
});

// Get all patients
export const getAllPatients = asyncHandler(async (req, res) => {
  const patients = await User.find({ role: "patient" }).select("-password");
  res.json(patients);
});

// Delete user (Admin only)
export const deleteUser = async (req, res) => {
  // Logic for deleting a user
  try {
    const userId = req.params.id;
    // Delete user logic here
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user", error });
  }
};

// Register a doctor (Admin only)
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

// Get all users
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// Delete a user by ID
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// Update user role
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
