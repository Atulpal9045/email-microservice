const mongoose = require("mongoose");
const { EmailLog, Credential } = require("../models");

// ✅ Resolve Email Address Based on userId & tenantId
const resolveEmail = async (userId, tenantId) => {
  const user = await Credential.findOne({ userId, tenantId });
  return user ? user.email : null;
};

// ✅ Check if Email is Reachable & Valid
const isValidEmail = (email) => {
  const throwawayDomains = ["mailinator.com", "tempmail.com", "10minutemail.com"];
  return !throwawayDomains.some((domain) => email.endsWith(domain));
};

// ✅ Check Daily Email Quota
const checkQuota = async (tenantId) => {
  const today = new Date().toISOString().split("T")[0];
  const emailCount = await EmailLog.countDocuments({ tenantId, date: today });
  return emailCount < process.env.EMAIL_QUOTA; // Limit from environment variable
};

// ✅ Log Email Status
const logEmailStatus = async (jobId, status, email) => {
  await EmailLog.create({ jobId, email, status, date: new Date().toISOString().split("T")[0] });
};

module.exports = { resolveEmail, isValidEmail, checkQuota, logEmailStatus };
