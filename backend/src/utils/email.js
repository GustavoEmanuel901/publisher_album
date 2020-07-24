const nodeMailer = require("nodemailer");

const transporter = nodeMailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "cda57f68b483d2",
      pass: "5e0f4787e49c49"
    }
  });


module.exports = transporter;