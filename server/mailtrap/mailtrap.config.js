const Nodemailer = require("nodemailer");
const { MailtrapTransport } = require("mailtrap");
require("dotenv").config();

// const TOKEN = process.env.MAILTRAP_TOKEN;

// const transport = Nodemailer.createTransport(
//   MailtrapTransport({
//     token: TOKEN,
//   })
// );

module.exports.transporter = Nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SERVER_EMAIL,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // Allow self-signed certificates
  },
});

module.exports.sender = {
  address: process.env.SERVER_EMAIL ,
  name: "Event Booking System",
};

