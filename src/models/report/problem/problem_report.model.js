import mongoose from "mongoose";

const problemReportSchema = new mongoose.Schema(
  {
    problemReportType: {
      type: Number,
      required: true,
      validate: {
        validator: Number.isInteger,
        message: "{VALUE} is not an integer value",
      },
    },
    description: {
      type: String,
      trim: true,
    },
    files: [
      {
        url: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
          trim: true,
        },
        type: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const ProblemReport = mongoose.model("ProblemReport", problemReportSchema);

export default ProblemReport;
