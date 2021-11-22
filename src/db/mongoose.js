
import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.CONNECTION_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log("MongoDB connected!");
  } catch (error) {
    console.log("Error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
