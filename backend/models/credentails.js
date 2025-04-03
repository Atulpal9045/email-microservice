const mongoose = require("mongoose");

const CredentialSchema = new mongoose.Schema({
  userId: String,
  tenantId: String,
  provider: { type: String, enum: ["gmail", "outlook"] },
  email: String,
  password: String, // Ideally, store encrypted credentials
});

module.exports = mongoose.model("Credential", CredentialSchema);
