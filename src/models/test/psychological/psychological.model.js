import mongoose from "mongoose";
import Question from "./question.model.js";

const psycholTestSchema = new mongoose.Schema(
  {
    questions: [
      {
        question: {
          type: Question.schema,
          required: true,
        },
        point: {
          type: Number,
          required: true,
          enum: [0, 1, 2, 3, 4],
        },
      },
    ],
    point: {
      type: Number,
      required: true,
      validate: {
        validator: Number.isInteger,
        message: "{VALUE} is not an integer value",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      async validate(value) {
        const user = await User.findById(value);
        if (!user) {
          throw new Error("This user does not exist");
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

const PsycholTest = mongoose.model("PsycholTest", psycholTestSchema);

export default PsycholTest;
