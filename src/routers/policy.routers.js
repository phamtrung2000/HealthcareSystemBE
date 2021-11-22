import express from "express";
const router = express.Router();
//import auth from "../middleware/auth.js";

import {
    deletePolicy,
    updatePolicy,
    createPolicy,
    getPolicy
} from "../controller/policy.controller.js"


router.get("/",  getPolicy);
router.post("/", createPolicy);
router.patch("/:id", updatePolicy);
router.delete("/:id", deletePolicy);

export default router;