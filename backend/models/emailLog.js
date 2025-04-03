// models/emailLog.js
const mongoose = require("mongoose");

const emailLogSchema = new mongoose.Schema({
  jobId: String,
  email: String,
  status: String,
  date: String,
});

module.exports = mongoose.model("EmailLog", emailLogSchema);
