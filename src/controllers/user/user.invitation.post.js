const router = require('express').Router();
const errors = require('../../errors');
const sgMail = require('@sendgrid/mail');
const nodemailer = require('nodemailer');
const {check, validationResult} = require('express-validator');

router.post('/user/invitation', [check('email').isEmail()],
  errors.wrap(async (req, res) => {
    const error = validationResult(req);
        if (!error.isEmpty()) {
          return res.status(422).json({errors: error.array()});
        }
    const user = req.body;
    // if (!user.password) user.password = 'HelloWorld!';
    user.password = 'adminadmin';
    const existinguser = await models.User.findOne({where: {email: user.email}});
    if (existinguser) throw errors.InvalidInputError('User with same email already exists');
    const result = await models.User.create(user);        
    // console.log('TEST RESET PASSWORD', result.uuid);
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: `${process.env.EMAIL_ADDRESS}`,
        pass: `${process.env.EMAIL_PASSWORD}`,
      }
    });
    const mailOptions = {
      from: 'rodion.leginkov@gmail.com',
      to: `${result.email}`,
      subject: 'Welcome to the Exceed Team CRM!',
      text:
      'Welcome to the Exceed Team CRM!\n\n'
      + 'Please click on the following link, or paste this into your browser to create your password and start using CRM system:\n\n'
      + `https://black-list-frontend.herokuapp.com/reset/${result.uuid}\n\n`
      + 'Best Regards,'
      + 'Exceed Team,\n',
      
    };
    transporter.sendMail(mailOptions, (err, response) =>{
      if (err) console.error('there was an error: ', err);
      else {
        console.log('here is the res: ', response);
        res.status(200).json('recovery email sent');
      }
});

    res.json(result);
})
);

module.exports = router;

