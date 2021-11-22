import mongoose from "mongoose";

const policySchema = new mongoose.Schema({
    dataPolicy:{ type: String, required: true },
  });
  
  export default mongoose.model("Policy", policySchema);