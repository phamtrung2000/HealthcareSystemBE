import express from "express";
const router = express.Router();
//import auth from "../middleware/auth.js";

import {
    getTopics,
    createNewTopic,
    updateTopic,
    deleteTopic,
    addQuesAndAns,
    removeQuesAndAns
} from "../controller/topic.controller.js"


router.get("/",  getTopics);
router.post("/", createNewTopic);
router.patch("/:id", updateTopic);
router.delete("/:id", deleteTopic);

router.patch("/:topicId/addQuesAndAns", addQuesAndAns);
router.patch("/", removeQuesAndAns);

export default router;