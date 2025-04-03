const { Worker } = require("bullmq");
const nodemailer = require("nodemailer");
const { resolveEmail, isValidEmail, checkQuota, logEmailStatus } = require("../utils");
const { redisConnection } = require("../config");

// Initialize Worker
const emailWorker = new Worker(
  "emailQueue",
  async (job) => {
    const { toAddress, tenantId, userId, subject, body } = job.data;

    // Resolve Email Address
    const email = await resolveEmail(userId, tenantId);
    if (!email) {
      await logEmailStatus(job.id, "FAILED - Email not found", toAddress);
      throw new Error("Email not found for userId & tenantId");
    }

    // Check if Email is Valid
    if (!isValidEmail(email)) {
      await logEmailStatus(job.id, "FAILED - Invalid Email", email);
      throw new Error("Invalid or throwaway email detected.");
    }

    // Check Daily Quota
    const canSend = await checkQuota(tenantId);
    if (!canSend) {
      await logEmailStatus(job.id, "FAILED - Quota Exceeded", email);
      throw new Error("Daily quota exceeded.");
    }

    // Configure Transporter (Replace with your SMTP details)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail ID
        pass: process.env.EMAIL_PASS, // App Password
      },
    });

    // Send Email
    try {
      await transporter.sendMail({
        from: `"No Reply" <${process.env.EMAIL_USER}>`,
        to: email,
        subject,
        text: body,
      });

      await logEmailStatus(job.id, "SENT", email);
      console.log(`✅ Email sent to ${email}`);
    } catch (err) {
      await logEmailStatus(job.id, "FAILED - SMTP Error", email);
      console.error("❌ Email send error:", err);
      throw err;
    }
  },
  { connection: redisConnection }
);

console.log("🚀 Email Worker is running...");

module.exports = { emailWorker };
