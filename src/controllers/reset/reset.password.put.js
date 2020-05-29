const errors = require('../../errors');
const router = require('express').Router();
const {Op} = require('sequelize');
const jwt = require('jsonwebtoken');
const arrangeInputs = require('../../middleware/arrange-inputs');

router.put('/v1/reset/',
arrangeInputs('body', {
  password: {type: 'STRING',
  required: true,
  pattern: /^([A-Za-z0-9!@#$%^&*()_+=\[{\]};:<>|./?,-]).{6,15}$/,
  }
}),
    errors.wrap(async (req, res) => {
      const models = res.app.get('models');
      const password = req.body.password;
      const token = req.body.token;
      console.log(req.body.token);
      console.log('password', password);
     
      console.log('after', token);

      const user = await models.User.findOne({
        include: [{
          model: models.UserToken,
          as: 'Reset',
          where: {token: token}
        }]
      });

      console.log('user', user);
      const existingToken = await models.UserToken.findOne({
        where: {
          userUuid: user.dataValues.uuid,
          expiresIn: {[Op.gt]: Date.now()},
        },
      }); 

      if (!existingToken) throw errors.NotFoundError('Password reset token is invalid or has expired.');

      const hashedPassword = models.User.hashPassword(password, user.email);
      if (user.password === hashedPassword) throw errors.InvalidInputError('Old password and new password match!');
      user.password = hashedPassword;

      await user.update({
        password: req.body.password,
      });
      await user.save();

      await models.UserToken.destroy({
        where: {
          userUuid: user.uuid,
        },
      });

      res.json({
        user, 
        token: token
      });
    })
);

module.exports = router;
