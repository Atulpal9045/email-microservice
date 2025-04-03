const nodemailer = require("nodemailer");

const outlookTransport = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.OUTLOOK_USER,
    pass: process.env.OUTLOOK_PASS,
  },
});

module.exports = outlookTransport;
