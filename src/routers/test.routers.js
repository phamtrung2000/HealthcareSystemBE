import express from "express";
const router = express.Router();

import psychologicalRouter from "./test.psychological.router.js";

router.use("/psychological", psychologicalRouter);

export default router;
