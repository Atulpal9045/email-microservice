const express = require("express");
const { addEmailToQueue } = require("../queue/emailQueue");
const router = express.Router();

router.post("/send", async (req, res) => {
    console.log('api called-----')
  const { userId, tenantId, subject, body } = req.body;

  if (!userId || !tenantId || !subject || !body) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  await addEmailToQueue({ userId, tenantId, subject, body });
  res.json({ success: true, message: "Email added to the queue" });
});

module.exports = router;
