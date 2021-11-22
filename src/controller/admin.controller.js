import mongoose from "mongoose";
import Topic from "../models/faq/topic.model.js";

//delete for admin
export const deleteTopicForAdmin = async (req, res) => {
  const { id, role } = req.params;
  if (role !== "admin") return res.status(404).send(`You are not Admin`);
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No Topic with id: ${id}`);
  try {
    await Topic.findByIdAndRemove(id);

    res.status(200).json({ message: `Deleted topic for Admin with id: ${id}` });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
