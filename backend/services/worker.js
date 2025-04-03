// worker.js
const { emailWorker } = require("../queue/emailWorker");

console.log("🚀 Email Worker is running...");
console.log("📅 Email Queue Scheduler is active...");

process.on("SIGINT", async () => {
  console.log("Shutting down worker...");
  await emailWorker.close();
//   await emailQueueScheduler.close();
  process.exit(0);
});
