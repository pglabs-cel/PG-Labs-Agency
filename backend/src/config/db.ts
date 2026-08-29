import mongoose from "mongoose";

export const connectDB = async (): Promise<boolean> => {
  try {
    const mongoUri = process.env.MONGO_DB_URL;
    if (!mongoUri) {
      console.warn("[MongoDB] ⚠️ MONGO_DB_URL is not set in environment variables.");
      return false;
    }

    if (mongoose.connection.readyState === 1) {
      return true;
    }

    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 8000,
      connectTimeoutMS: 10000,
      family: 4, // Prioritize IPv4 for cloud environments
    });

    console.log(`[MongoDB] ✓ Connected successfully to ${conn.connection.host}`);
    return true;
  } catch (error: any) {
    console.error("[MongoDB] ❌ Connection error:", error.message || error);
    return false;
  }
};

export const ensureDBConnected = async (): Promise<void> => {
  if (mongoose.connection.readyState !== 1) {
    await connectDB();
  }
};

export const getDBStatus = (): string => {
  switch (mongoose.connection.readyState) {
    case 0:
      return "disconnected";
    case 1:
      return "connected";
    case 2:
      return "connecting";
    case 3:
      return "disconnecting";
    default:
      return "unknown";
  }
};
