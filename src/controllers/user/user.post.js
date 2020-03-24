const router = require('express').Router();
const errors = require('../../errors');
const arrangeInputs = require('../../middleware/arrange-inputs');
/**
 *  @swagger
 *
 *  /v1/user:
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

router.post('/v1/user',
    arrangeInputs('body', {
        email: {required: false},
        firstName: {required: true},
        lastName: {required: true},
        password: {required: true},
        role: {required: false},
    }),
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
