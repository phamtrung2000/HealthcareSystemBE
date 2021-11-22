import Post from "../models/community/post.model.js";
import mongoose from "mongoose";

export default {
  getPosts: async (req, res) => {
    try {
      const posts = await Post.find()
        .populate({ path: "user", select: ["fullname"] })
        .exec();
      res.json({ data: posts, message: "OK" });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  createPost: async (req, res) => {
    const { user, title, content } = req.body;
    try {
      const post = new Post({
        user,
        title,
        content,
      });
      await post.save();
      res.status(201).json({ message: "Create post success" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  getPost: async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: `No post with id: ${id}` });
    try {
      const post = await Post.find({ _id: id })
        .populate({ path: "user", select: ["fullname"] })
        .exec();
      res.json({ data: post, message: "OK" });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  deletePost: async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: `No post with id: ${id}` });
    try {
      await Post.findByIdAndRemove(id);
      res.status(201).json({ message: "Delete post success" });
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  },
  updatePost: async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: `No post with id: ${id}` });
    try {
      const result = await Post.findByIdAndUpdate(
        id,
        {
          $set: { title: title, content: content },
        },
        { new: true }
      );
      res.status(201).json({ message: "Update post success" });
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  },
};
