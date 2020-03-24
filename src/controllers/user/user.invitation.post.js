const router = require('express').Router();
const errors = require('../../errors');

router.post('/v1/user/invitation',
  errors.wrap(async (req, res) => {
    const user = req.body;
    if (!user.password) user.password = 'HelloWorld!';
    const existinguser = await models.User.findOne({where: {email: user.email}});
    if (existinguser) throw errors.InvalidInputError('Filter with same name already exists');
    const result = await models.User.create(user);        
    res.json(result);
})
);

module.exports = router;

