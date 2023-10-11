const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      secure: false,
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: `SebTheDeveloper.com <${process.env.SMTP_USER}>`,
      to: options.to,
      subject: options.subject,
      bcc: options.bcc,
      text: options.text,
      html: options.html,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email to ${options.to} sent successfully`);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = sendEmail;
