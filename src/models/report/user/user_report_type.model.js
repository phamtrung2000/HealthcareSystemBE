import mongoose from "mongoose";

const userReportTypeSchema = new mongoose.Schema({
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

const UserReportType = mongoose.model("UserReportType", userReportTypeSchema);

export default UserReportType;
