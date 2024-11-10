// controllers/reportController.js
import asyncHandler from "express-async-handler";
import Report from "../models/reportModel.js";

export const uploadReport = asyncHandler(async (req, res) => {
  const { patient, doctor, reportDetails } = req.body;
  const report = await Report.create({ patient, doctor, reportDetails });
  res.status(201).json(report);
});

export const getReports = asyncHandler(async (req, res) => {
  const reports = await Report.find({ patient: req.params.patientId });
  res.json(reports);
});
