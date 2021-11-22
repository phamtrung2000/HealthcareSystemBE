import mongoose from "mongoose";

const psycholQuestionSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true,
  },
});

const Question = mongoose.model("PsycholQuestion", psycholQuestionSchema);
export default Question;
