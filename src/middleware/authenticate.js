'use strict';
const jwt = require('jsonwebtoken');
const errors = require('../errors');

module.exports = function authenticate(allowedRoles) {
    return errors.wrap(async function (req, res, next) {
        const models = res.app.get('models');
        // console.log(req.headers);
        if (!('authorization' in req.headers)) return res.status(403).send('Missing authorization header');
        // const token = req.headers['authorization'].split(' ')[1];
        const token = req.headers.authorization;
        let payload;
        try {
            payload = jwt.verify(token, process.env.SALT || 'salt');
            // console.log('payload', payload);
        } catch (err) {
            throw errors.UnauthorizedError(err.name);
        }

        const user = await models.User.findByPk(payload.userId);
        // console.log(user);
        if (!user) throw errors.UnauthorizedError('User not found');
       // if (allowedRoles && allowedRoles.includes(user.role)) throw errors.Forbidden('Not enough rights');

        res.locals.user = user;
        next();
    });
};
