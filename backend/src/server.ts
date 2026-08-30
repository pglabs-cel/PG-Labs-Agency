import dotenv from "dotenv";
dotenv.config();

import dns from "node:dns";
if (dns.setDefaultResultOrder) {
  dns.setDefaultResultOrder("ipv4first");
}

import app from "./app";
import { connectDB } from "./config/db";
import { verifyTransporter } from "./config/mail";

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 PG Labs Backend running on port ${PORT}`);
  
  // Connect to database and verify email transporter asynchronously
  connectDB().then((connected) => {
    if (connected) {
      console.log("[Server] Database readiness verified.");
    }
  });

  verifyTransporter().catch((err) => {
    console.warn("[Server] SMTP check warning:", err.message || err);
  });
});

export default server;
