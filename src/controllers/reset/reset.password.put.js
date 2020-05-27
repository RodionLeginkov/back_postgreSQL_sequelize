const errors = require('../../errors');
const router = require('express').Router();
const {Op} = require('sequelize');
const jwt = require('jsonwebtoken');

router.put('/v1/reset/',
    errors.wrap(async (req, res) => {
      const models = res.app.get('models');
      const {password} = req.body;
      const {token} = req.query;

      const {userEmail} = verifyToken(token);

      const user = await models.User.findOne({where: {email: userEmail}});

      const existingToken = await models.ResetToken.findOne({
        where: {
          userUuid: user.uuid,
          expiresIn: {[Op.gt]: Date.now()},
        },
      });

      if (!existingToken) throw errors.NotFoundError('Password reset token is invalid or has expired.');

      const hashedPassword = models.User.hashPassword(password, user.email);
      if (user.password === hashedPassword) throw errors.InvalidInputError('Old password and new password match!');
      user.password = hashedPassword;
      await user.save();

      await models.ResetToken.destroy({
        where: {
          userUuid: user.uuid,
        },
      });

      res.json(user.email);
    })
);

verifyToken = (token) => {
  const payload = jwt.verify(token, process.env.SALT_TOKEN_RESET || 'salt');
  return payload;
};

module.exports = router;
