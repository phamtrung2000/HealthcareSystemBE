import mongoose from "mongoose";
import QuesAndAns from "./quesandans.model.js";

const topicSchema = new mongoose.Schema({
    topicName:{ type: String, required: true },
    listQuestionAndAnswer:{
      type: [QuesAndAns.schema],
      default: []
    }
  });

 export default mongoose.model("Topic", topicSchema);