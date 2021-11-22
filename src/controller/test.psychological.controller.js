import mongoose from "mongoose";

import Question from "../models/test/psychological/question.model.js";
import Psychological from "../models/test/psychological/psychological.model.js";

export const questionController = {
  getQuestions: async (req, res) => {
    try {
      const questions = await Question.find().exec();
      res.json({ data: questions, message: "OK" });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  createQuestion: async (req, res) => {
    const { content } = req.body;
    try {
      const question = new Question({
        content,
      });
      await question.save();
      res.status(201).json({ message: "Create question success" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  deleteQuestion: async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: `No question with id: ${id}` });
    try {
      await Question.findByIdAndRemove(id);
      res.status(201).json({ message: "Delete question success" });
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  },
  updateQuestion: async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: `No question with id: ${id}` });
    try {
      await Question.findByIdAndUpdate(id, {
        $set: { content },
      });
      res.status(201).json({ message: "Update question success" });
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  },
};

export const psychologicalController = {
  getPsychologicalTests: async (req, res) => {
    const user = req.user;
    try {
      let psychologicalTests;
      if (user.role === "admin") {
        psychologicalTests = await Psychological.find()
          .populate({ path: "user", select: ["fullname"] })
          .exec();
      } else {
        psychologicalTests = await Psychological.find({ user: user.id })
          .populate({ path: "user", select: ["fullname"] })
          .exec();
      }
      res.json({ data: psychologicalTests, message: "OK" });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  createPsychologicalTest: async (req, res) => {
    const { questions, point, user } = req.body;
    try {
      const psychologicalTest = new Psychological({
        questions,
        point,
        user,
      });
      await psychologicalTest.save();
      res.status(201).json({ message: "Create psychological test success" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  deletePsychologicalTest: async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res
        .status(404)
        .json({ message: `No psychological test with id: ${id}` });
    try {
      await Psychological.findByIdAndRemove(id);
      res.status(201).json({ message: "Delete psychological test success" });
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  },
};
