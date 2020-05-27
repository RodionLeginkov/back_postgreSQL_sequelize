const errors = require('../../errors');
const router = require('express').Router()
const { sendEmail } = require('../../options/send-email');
const { resetPassword } = require('../../options/reset-password-mail');
const arrangeInputs = require('../../middleware/arrange-inputs');
const jwt = require('jsonwebtoken');


router.post('/v1/reset',
arrangeInputs('body', {
  email: {type: 'STRING',
      required: true,
      pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      transform: (val) => val.toLowerCase()
  }
}),
    errors.wrap(async (req, res) => {
        const models = res.app.get('models');
        console.log(req.body)
        const body = req.body;
        const user = await models.User.findOne({ where: { email: body.email } });
        if (!user) throw errors.NotFoundError('User with such email not found.');


        await models.ResetToken.destroy({
          where: {
              userUuid: user.uuid,
          },
      });


        const token = await models.ResetToken.create({
          userUuid: user.uuid,
          expiresIn: Date.now() + 3600 * 24 * 1000, // 24 hour
          token: generateToken(body),
        });
        

        await sendEmail(resetPassword({ ...user.dataValues }, token));
        const authToken = await user.generateToken();
        delete user.dataValues.password;
        res.status(200).json({
            user: user,
            token: authToken,
        });
    })
);

const generateToken = ({ email }) => {
    const salt = process.env.SALT_TOKEN_RESET || 'salt';
    const data = {
        userEmail: email,
    };

    const tokenLifeTime = 3600 * 24 * 1000; // 24 hour
    return jwt.sign(data, salt, { expiresIn: tokenLifeTime });
};

module.exports = router;
