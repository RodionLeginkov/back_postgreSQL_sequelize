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

router.post('/user', arrangeInputs('body', {
    firstName: {required: true},
    lastName: {required: true},
    password: {required: false},
    role: {required: true},
    email: {required: false},
}),
    errors.wrap(async (req, res) => {
        const user = req.body;
        if (req.body.email !== '') {
            const validateEmail = (email) => (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email));
            if (!validateEmail(req.body.email)) throw errors.InvalidInputError('email is wrong'); ;
            const existinguser = await models.User.findOne({where: {email: user.email}});
            if (existinguser) throw errors.InvalidInputError('User with same email already exists');
            console.log('hello');
        }
        if (!user.password) user.password = 'HelloWorld!';
        const result = await models.User.create(user);        
        res.json(result);
    })
);

module.exports = router;
