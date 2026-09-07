import dotenv from "dotenv";
dotenv.config();

import dns from "node:dns";
if (dns.setDefaultResultOrder) {
  dns.setDefaultResultOrder("ipv4first");
}

import app from "./app";
import { connectDB } from "./config/db";
import { verifyTransporter } from "./config/mail";
import { ProjectService } from "./services/project.service";
import { initMediaSweeperCron } from "./jobs/mediaSweeper";

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 PG Labs Backend running on port ${PORT}`);
  
  // Initialize background zombie media cleanup sweeper (Requirement 11)
  initMediaSweeperCron();

  // Connect to database, seed projects, and verify email transporter asynchronously
  connectDB().then(async (connected) => {
    if (connected) {
      console.log("[Server] Database readiness verified.");
      await ProjectService.seedInitialProjects();
    }
  });

  verifyTransporter().catch((err) => {
    console.warn("[Server] SMTP check warning:", err.message || err);
  });
});

export default server;
