import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGO_DB_URL;
    if (!mongoUri) {
      console.warn("?? MONGO_DB_URL is not set in environment variables.");
      return;
    }
    const conn = await mongoose.connect(mongoUri);
    console.log(`? MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("? MongoDB connection error:", error);
    // Don't kill process in dev immediately, allow server to run
  }
};
