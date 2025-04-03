

const emailQueueScheduler = new QueueScheduler("emailQueue");
console.log("📅 Email Queue Scheduler started...");

module.exports = { emailQueueScheduler };
