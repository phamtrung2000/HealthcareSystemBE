import express from "express";
const router = express.Router();

const questionRouter = express.Router({ mergeParams: true });

import {
  psychologicalController,
  questionController,
} from "../controller/test.psychological.controller.js";

// Question Router
router.use("/question", questionRouter);
questionRouter.get("/", questionController.getQuestions);
questionRouter.post("/", questionController.createQuestion);
questionRouter.delete("/:id", questionController.deleteQuestion);
questionRouter.patch("/:id", questionController.updateQuestion);

// Psychological Router
router.get("/", psychologicalController.getPsychologicalTests);
router.post("/", psychologicalController.createPsychologicalTest);
router.delete("/:id", psychologicalController.deletePsychologicalTest);

export default router;
