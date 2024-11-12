import express from "express";
import multer from "multer";
import { protect } from "../middleware/authMiddleware.js";
import {
  createReport,
  getReportById,
  downloadReportFile,
} from "../controllers/reportController.js";

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/reports");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Routes
router.post("/upload", protect, upload.single("file"), createReport);
router.get("/:id", protect, getReportById);
router.get("/download/:id", protect, downloadReportFile);

export default router;
