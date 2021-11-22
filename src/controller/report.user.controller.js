import mongoose from "mongoose";

import UserReport from "../models/report/user/user_report.model.js";
import UserReportType from "../models/report/user/user_report_type.model.js";

export const userReportController = {
  getUserReports: async (req, res) => {
    try {
      const userReports = await UserReport.find()
        .populate({ path: "user", select: ["fullname"] })
        .exec();
      res.json({ data: userReports, message: "OK" });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  createUserReport: async (req, res) => {
    const { receiveEmail, reportedUserID, userReportType, user } = req.body;
    try {
      const userReport = new UserReport({
        receiveEmail,
        reportedUserID,
        userReportType,
        user,
      });
      await userReport.save();
      res.status(201).json({ message: "Create user report success" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  getUserReport: async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: `No User Report with id: ${id}` });
    try {
      const userReport = await UserReport.find({ _id: id })
        .populate({ path: "user", select: ["fullname"] })
        .exec();
      res.json({ data: userReport, message: "OK" });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  // updateUserReport : async (req, res) => {
  //   const { id } = req.params;
  //   const { dataUserReport } = req.body;
  //   if (!mongoose.Types.ObjectId.isValid(id))
  //     return res.status(404).send(`No User Report with id: ${id}`);
  //   try {
  //     await UserReport.findByIdAndUpdate(id, {
  //       $set: { dataUserReport },
  //     });
  //   } catch (error) {
  //     res.status(409).json({ message: error.message });
  //   }}
};

export const userReportTypeController = {
  getUserReportTypes: async (req, res) => {
    try {
      const userReportTypes = await UserReportType.find().exec();
      res.json({ data: userReportTypes, message: "OK" });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  createUserReportType: async (req, res) => {
    const { name, value } = req.body;
    try {
      const userReportType = new UserReportType({ name, value });
      await userReportType.save();
      res.status(201).json({ message: "Create user report type success" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  updateUserReportType: async (req, res) => {
    const { id } = req.params;
    const { name, value } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res
        .status(404)
        .json({ message: `No User Report Type with id: ${id}` });
    try {
      await UserReportType.findByIdAndUpdate(id, {
        $set: { name, value },
      });
      res.status(201).json({ message: "Update user report type success" });
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  },
  deleteUserReportType: async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res
        .status(404)
        .json({ message: `No User Report Type with id: ${id}` });
    try {
      await UserReportType.findByIdAndRemove(id);
      res.status(201).json({ message: "Delete user report type success" });
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  },
};
