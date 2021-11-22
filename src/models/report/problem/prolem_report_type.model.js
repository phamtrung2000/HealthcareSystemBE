import mongoose from "mongoose";

const problemReportTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  value: {
    type: Number,
    required: true,
    unique: true,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value",
    },
  },
});

const ProblemReportType = mongoose.model(
  "ProblemReportType",
  problemReportTypeSchema
);

export default ProblemReportType;
