const { Queue, Worker, QueueScheduler } = require("bullmq");
const Redis = require("ioredis");
const { sendEmail } = require("../services/emailService");
const { resolveEmail } = require("../utils");


const redisConnection = new Redis();

const emailQueue = new Queue("emailQueue", { connection: redisConnection });

// Queue Scheduler for Retry Logic
const emailQueueScheduler = new QueueScheduler("emailQueue", { connection: redisConnection });

// Function to add email jobs to the queue
const addEmailToQueue = async (emailData) => {
  await emailQueue.add("sendEmail", emailData, {
    attempts: 5, // Retry up to 5 times
    backoff: { type: "exponential", delay: 5000 }, // Exponential backoff delay
  });
};

module.exports = { addEmailToQueue, emailWorker, emailQueueScheduler};
