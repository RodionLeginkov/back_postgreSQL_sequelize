const nodemailer = require('nodemailer');

exports.sendEmail = (mailOptions) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${process.env.EMAIL_ADDRESS}`,
      pass: `${process.env.EMAIL_PASSWORD}`,
    }
  });

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) throw err.InternalServerError('Email wasn\`t send, reason');

    res.status(200).json('recovery email sent');
  });
};
