import express from "express";
import postController from "../controller/post.controller.js";
const router = express.Router();

router.get("/", postController.getPosts);
router.post("/", postController.createPost);
router.patch("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);
router.get("/:id", postController.getPost);

export default router;
