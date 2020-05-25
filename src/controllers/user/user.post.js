const authenticate = require('../../middleware/authenticate');
const router = require('express').Router();
const errors = require('../../errors');
const arrangeInputs = require('../../middleware/arrange-inputs');
/**
 *  @swagger
 *
 *  /user:
 *    post:
 *      tags:
 *        - users
 *      description: Save new user
 *      parameters:
 *        - name: email
 *          default: admin_email
 *          description: user email
 *          in: formData
 *          type: string
 *          required: true
 *        - name: firstName
 *          default: admin_firstname
 *          description: user firstname
 *          in: formData
 *          type: string
 *          required: true
 *        - name: lastName
 *          in: formData
 *          type: string
 *          required: true
 *          description: user last name
 *          default: 'lastname'
 *        - name: role
 *          description: user role (admin or user)
 *          enum:
 *            - manager
 *            - staff
 *            - developer
 *          default: user
 *          in: formData
 *          type: string
 *        - name: isActive
 *          description: is user active or not
 *          default: true
 *          in: formData
 *          type: boolean
 *          required: false
 *      responses:
 *        200:
 *          description: user data
 */

router.post('/user',
    authenticate(),
    arrangeInputs('body', {
        firstName: {type: 'STRING', required: true},
        lastName: {type: 'STRING', required: true},
        password: {type: 'STRING'},
        role: {type: 'STRING', required: true},
        email: {type: 'STRING',
            required: false,
            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            transform: (val) => val.toLowerCase()
        }
    }),
    errors.wrap(async (req, res) => {
        const user = req.body;
        // if (req.body.email !== undefined) {
        //     const validateEmail = (email) => (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email));
        //     if (!validateEmail(req.body.email)) throw errors.InvalidInputError('email is wrong');
        // }
        if (!user.password) user.password = 'HelloWorld!';
        const result = await models.User.create(user);
        delete result.dataValues.password;
        res.json(result);
    })
);
module.exports = router;
