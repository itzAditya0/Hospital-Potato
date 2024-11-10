// models/reportModel.js
import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    reportDetails: { type: String, required: true },
    approved: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Report = mongoose.model("Report", reportSchema);
export default Report;
