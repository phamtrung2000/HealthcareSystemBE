import mongoose from "mongoose";

const quesAndAns = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
  });
 
  export default mongoose.model("QuesAndAns", quesAndAns);