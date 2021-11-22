import express from "express";
const router = express.Router();

import problemRouter from "./report.problem.routers.js";
import userRouter from "./report.user.routers.js";

router.use("/problem", problemRouter);
router.use("/user", userRouter);

export default router;
