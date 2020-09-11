const nodemailer = require('nodemailer');

exports.sendEmail = (mailOptions) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${process.env.EMAIL_ADDRESS}`,
      pass: `${process.env.EMAIL_PASSWORD}`,
    }
  });

let sendMail;
try {
  sendMail = transporter.sendMail(mailOptions);
} catch (err) {
  throw new Error(err.message);
}
transporter.close();
return sendMail;
};
