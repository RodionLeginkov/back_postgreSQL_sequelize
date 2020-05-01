const router = require('express').Router();
const errors = require('../../errors');
const sgMail = require('@sendgrid/mail');
const nodemailer = require('nodemailer');
const mandrill = require('mandrill-api/mandrill');

/**
 *  @swagger
 *  /forgotPass:
 *    post:
 *      tags:
 *        - user management
 *      description: reset password user
 *      parameters:
 *        - name: email
 *          default: JohnDoe@gmail.com
 *          required: true
 *          in: formData
 *          type: string
 *      responses:
 *        200:
 *          description: On your email send letter
 *        404:
 *          description: Email not found
 */

router.post('/forgotPass',
    errors.wrap(async (req, res) => {
        const models = res.app.get('models');

        const user = await models.User.findOne({where: {email: req.body.email}});
        
        if (!user) throw errors.NotFoundError('Email not found');
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: `${process.env.EMAIL_ADDRESS}`,
              pass: `${process.env.EMAIL_PASSWORD}`,
            }
          });
          const mailOptions = {
            from: 'rodion.leginkov@gmail.com',
            to: `${user.email}`,
            subject: 'Welcome to the Exceed Team CRM!',
            text:
            'Welcome to the Exceed Team CRM!\n\n'
            + 'Please click on the following link, or paste this into your browser to create your password and start using CRM system:\n\n'
            + `https://black-list-frontend.herokuapp.com/reset/${user.uuid}\n\n`
            + 'Best Regards,'
            + 'Exceed Team,\n',
            
          };
          transporter.sendMail(mailOptions, (err, response) =>{
            if (err) throw errors.InternalServerError('Email wasn\`t sent');
            else {
              console.log('here is the res: ', response);
              res.status(200).json('recovery email sent');
            }
      });
      
          res.json(user);
      })
      );

module.exports = router;
