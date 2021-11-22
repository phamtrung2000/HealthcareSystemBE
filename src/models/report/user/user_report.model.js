import mongoose from "mongoose";

const userReportSchema = new mongoose.Schema(
  {
    receiveEmail: {
      type: Boolean,
      require: true,
      default: false,
    },
    reportedUserID: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    userReportType: {
      type: Number,
      require: true,
      validate: {
        validator: Number.isInteger,
        message: "{VALUE} is not an integer value",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const UserReport = mongoose.model("UserReport", userReportSchema);

export default UserReport;
