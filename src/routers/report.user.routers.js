import express from "express";
const router = express.Router();
const typeRouter = express.Router({ mergeParams: true });
import {
  userReportController,
  userReportTypeController,
} from "../controller/report.user.controller.js";

// User Type Router
router.use("/type", typeRouter);

/**
 * GET User report type list
 * @returns User report type list | empty
 */
typeRouter.get("/", userReportTypeController.getUserReportTypes);
/**
 * CREATE User report type
 */
typeRouter.post("/", userReportTypeController.createUserReportType);
/**
 * UPDATE User report type
 */
typeRouter.patch("/:id", userReportTypeController.updateUserReportType);
/**
 * DELETE User report type
 */
typeRouter.delete("/:id", userReportTypeController.deleteUserReportType);

// User Router

/**
 * GET User report list
 * @returns User report list | empty
 */
router.get("/", userReportController.getUserReports);
/**
 * CREATE User report type
 */
router.post("/", userReportController.createUserReport);
/**
 * GET User report by id
 * @returns User report | null
 */
router.get("/:id", userReportController.getUserReport);

export default router;
