import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDB } from "./config/db";
import { verifyTransporter } from "./config/mail";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  await verifyTransporter();

  app.listen(PORT, () => {
    console.log(`🚀 PG Labs Backend running on port ${PORT}`);
  });
};

startServer();
