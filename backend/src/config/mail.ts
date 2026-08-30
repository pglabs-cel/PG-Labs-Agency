import dotenv from "dotenv";
dotenv.config();
import nodemailer, { Transporter } from "nodemailer";

export interface MailConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  adminEmail: string;
  senderName: string;
}

export const getMailConfig = (): MailConfig => {
  return {
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "465", 10),
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : true,
    user: process.env.EMAIL_USER || "pglabs.agency@gmail.com",
    pass: process.env.EMAIL_PASS || "",
    adminEmail: process.env.ADMIN_NOTIFICATION_EMAIL || "pglabs.agency@gmail.com",
    senderName: process.env.EMAIL_SENDER_NAME || "PG Labs",
  };
};

export const isMailConfigured = (): boolean => {
  const config = getMailConfig();
  return Boolean(config.user && config.pass);
};

export const createTransporter = (): Transporter => {
  const config = getMailConfig();

  const isGmail =
    config.host.toLowerCase().includes("gmail") ||
    config.user.toLowerCase().endsWith("@gmail.com");

  if (isGmail) {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.user,
        pass: config.pass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
    family: 4,
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  } as any);
};

export const mailTransporter = createTransporter();

export const verifyTransporter = async (): Promise<boolean> => {
  const config = getMailConfig();
  if (!config.user || !config.pass) {
    console.warn(
      "[MailService] ⚠️ SMTP credentials not fully configured (EMAIL_PASS is empty). Email notifications will be skipped or queued in simulation mode."
    );
    return false;
  }

  try {
    await mailTransporter.verify();
    console.log(
      `[MailService] ✓ SMTP Transporter connected successfully (${config.host}:${config.port} as ${config.user})`
    );
    return true;
  } catch (error) {
    console.error("[MailService] ❌ SMTP Transporter verification failed:", error);
    return false;
  }
};
