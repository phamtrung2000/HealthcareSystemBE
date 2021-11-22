import express from "express";
const router = express.Router();
const typeRouter = express.Router({ mergeParams: true });
import {
  probReportController,
  probReportTypeController,
} from "../controller/report.problem.controller.js";

// Problem Type Router
router.use("/type", typeRouter);

/**
 * GET problem report type list
 * @returns problem report type list | empty
 */
typeRouter.get("/", probReportTypeController.getProblemReportTypes);
/**
 * CREATE problem report type
 */
typeRouter.post("/", probReportTypeController.createProblemReportType);
/**
 * UPDATE problem report type
 */
typeRouter.patch("/:id", probReportTypeController.updateProblemReportType);
/**
 * DELETE problem report type
 */
typeRouter.delete("/:id", probReportTypeController.deleteProblemReportType);

// Problem Router

/**
 * GET problem report list
 * @returns problem report list | empty
 */
router.get("/", probReportController.getProblemReports);
/**
 * CREATE problem report type
 */
router.post("/", probReportController.createProblemReport);
/**
 * GET problem report by id
 * @returns problem report | null
 */
router.get("/:id", probReportController.getProblemReport);

export default router;
