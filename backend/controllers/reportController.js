import asyncHandler from "express-async-handler";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Report from "../models/reportModel.js";

// Resolve __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the uploads/reports directory exists
const ensureUploadPath = () => {
  const uploadDir = path.join(__dirname, "../uploads/reports");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
};

ensureUploadPath();

// Create a new report
export const createReport = asyncHandler(async (req, res) => {
  ensureUploadPath();
  const { patientId, description, reportType } = req.body;
  const file = req.file;

  if (!file) {
    res.status(400);
    throw new Error("No file uploaded");
  }

  const report = await Report.create({
    patientId,
    description,
    reportType,
    filePath: file.path,
    fileName: file.filename,
    fileType: file.mimetype,
    createdAt: Date.now(),
  });

  res.status(201).json(report);
});

// Get a report by ID
export const getReportById = asyncHandler(async (req, res) => {
  const report = await Report.findById(req.params.id);
  if (!report) {
    res.status(404);
    throw new Error("Report not found");
  }
  res.json(report);
});

// Download a report file by ID
export const downloadReportFile = asyncHandler(async (req, res) => {
  const report = await Report.findById(req.params.id);

  if (!report || !report.filePath) {
    res.status(404);
    throw new Error("Report or file not found");
  }

  const filePath = path.join(__dirname, "../", report.filePath);
  res.download(filePath, report.fileName, (err) => {
    if (err) {
      res.status(500).send({ message: "Error downloading file" });
    }
  });
});
