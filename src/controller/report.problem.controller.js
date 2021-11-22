import mongoose from "mongoose";

import ProblemReport from "../models/report/problem/problem_report.model.js";
import ProblemReportType from "../models/report/problem/prolem_report_type.model.js";

export const probReportController = {
  getProblemReports: async (req, res) => {
    try {
      const problemReports = await ProblemReport.find()
        .populate({ path: "user", select: ["fullname"] })
        .exec();
      res.json({ data: problemReports, message: "OK" });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  createProblemReport: async (req, res) => {
    const { problemReportType, description, files, user } = req.body;
    try {
      const problemReport = new ProblemReport({
        problemReportType,
        description,
        files,
        user,
      });
      await problemReport.save();
      res.status(201).json({ message: "Create problem report success" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  getProblemReport: async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res
        .status(404)
        .json({ message: `No Problem Report with id: ${id}` });
    try {
      const problemReport = await ProblemReport.find({ _id: id })
        .populate({ path: "user", select: ["fullname"] })
        .exec();
      res.json({ data: problemReport, message: "OK" });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  // updateProblemReport : async (req, res) => {
  //   const { id } = req.params;
  //   const { dataProblemReport } = req.body;
  //   if (!mongoose.Types.ObjectId.isValid(id))
  //     return res.status(404).send(`No Problem Report with id: ${id}`);
  //   try {
  //     await ProblemReport.findByIdAndUpdate(id, {
  //       $set: { dataProblemReport },
  //     });
  //   } catch (error) {
  //     res.status(409).json({ message: error.message });
  //   }}
};

export const probReportTypeController = {
  getProblemReportTypes: async (req, res) => {
    try {
      const problemReportTypes = await ProblemReportType.find().exec();
      res.json({ data: problemReportTypes, message: "OK" });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  createProblemReportType: async (req, res) => {
    const { name, value } = req.body;
    try {
      const problemReportType = new ProblemReportType({ name, value });
      await problemReportType.save();
      res.status(201).json({ message: "Create problem report type success" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  updateProblemReportType: async (req, res) => {
    const { id } = req.params;
    const { name, value } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res
        .status(404)
        .json({ message: `No Problem Report Type with id: ${id}` });
    try {
      await ProblemReportType.findByIdAndUpdate(id, {
        $set: { name, value },
      });
      res.status(201).json({ message: "Update problem report type success" });
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  },
  deleteProblemReportType: async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res
        .status(404)
        .json({ message: `No Problem Report Type with id: ${id}` });
    try {
      await ProblemReportType.findByIdAndRemove(id);
      res.status(201).json({ message: "Delete problem report type success" });
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  },
};
