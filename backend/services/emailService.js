const gmailTransport = require("../config/gmailTransport");
const outlookTransport = require("../config/outlookTransport");

// Send Email Function
const sendEmail = async ({ toAddress, subject, body, provider }) => {
  try {
    let transporter;

    // Choose the right transporter
    if (provider === "gmail") {
      transporter = gmailTransport;
    } else if (provider === "outlook") {
      transporter = outlookTransport;
    } else {
      throw new Error("Invalid email provider. Use 'gmail' or 'outlook'.");
    }

    const mailOptions = {
      from: transporter.options.auth.user,
      to: toAddress,
      subject: subject,
      text: body,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.response}`);
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Email sending error:", error);
    return { success: false, error: error.message };
  }
};

module.exports = { sendEmail };
