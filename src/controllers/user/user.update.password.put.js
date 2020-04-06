const router = require('express').Router();
const errors = require('../../errors');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

router.put('/users/updatePassword',
    // authenticate(),
    errors.wrap(async (req, res) => {
      // console.log(req.body.token);
      password = req.body.password;
      const user = await models.User.findByPk(req.body.token);
      console.log(user);
      if (user === null) throw errors.InvalidInputError('User isn"t exists');
      if (password.length < 6) throw errors.InvalidInputError('password is wrong');
      // const hashedPassword = await crypto.createHmac('sha512', process.env.SALT || 'salt').update(password).digest('hex');
      await user.update({
        password: req.body.password,
      });
      const token = await user.generateToken();
      await user.save();
      console.log(token);
      res.status(200).json({
        user: user,
        token: token,
    });
      // console.log(user.password);
    })
);

// router.put('/user/updatePassword', 
//   errors.wrap(async (req, res) => {
//     console.log('hello');
//     res.status(400).send('password is wrong');
//     // const user = await User.findByPk();
//     // console.log(req.params);
//     // console.log('HELLOOOO');
//     // if (req.body.password.length < 6) return res.status(400).send('password is wrong');
//     // if (user != null) {
//     //   console.log('user exists in db');
//     //   const hashedPassword = await bcrypt.hash(req.body.password, 10);
//     //   await user.update({
//     //     password: hashedPassword,
//     //     resetPasswordToken: null,
//     //     resetPasswordExpires: null
//     //   });
      
//     //   // console.log(user.login)
//     //   // console.log('password updated')
//     //   res.status(200).send({message: 'password updated'});
//     // }
// })
// );

module.exports = router;

