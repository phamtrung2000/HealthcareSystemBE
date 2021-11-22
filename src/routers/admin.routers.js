import express from "express";
const router = express.Router();

import { deleteTopicForAdmin } from "../controller/admin.controller.js";
router.delete("/:id/:role", deleteTopicForAdmin);

export default router;
