const authenticate = require('../../middleware/authenticate');
const router = require('express').Router();
const errors = require('../../errors');
const sgMail = require('@sendgrid/mail');
const nodemailer = require('nodemailer');
const {check, validationResult} = require('express-validator');
const arrangeInputs = require('../../middleware/arrange-inputs');
// 
router.post('/user/invitation/:uuid',
  // authenticate(),
  arrangeInputs('body', {
    email: {type: 'STRING',
        required: false,
        pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        transform: (val) => val.toLowerCase()
    }
}),
  errors.wrap(async (req, res) => {
    const models = res.app.get('models');
    const result = await models.User.findByPk(req.params.uuid);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: `${process.env.EMAIL_ADDRESS}`,
        pass: `${process.env.EMAIL_PASSWORD}`,
      }
    });
    
    const mailOptions = {
      from: 'exceed-team-1',
      to: `${result.email}`,
      subject: 'Welcome to the Exceed Team CRM!',
      text:
      'Welcome to the Exceed Team CRM!\n\n'
      + 'Please click on the following link, or paste this into your browser to create your password and start using CRM system:\n\n'
      + `${process.env.FRONTEND_URL}reset/${result.uuid}\n\n`
      + 'Best Regards,'
      + 'Exceed Team,\n',
      
    };
    transporter.sendMail(mailOptions, (err, response) =>{
      if (err) throw errors.InternalServerError(`Email wasn\`t send, reason: ${err.message}`);

        res.status(200).json('recovery email sent');
});

   res.json(result);
})
);

module.exports = router;
