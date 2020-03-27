const authenticate = require('../../middleware/authenticate');
const errors = require('../../errors');
const router = require('express').Router();
/**
 *  @swagger
 *  /example/{uuid}:
 *    put:
 *      tags:
 *        - user
 *      description: put example
 *      parameters:
 *        - name: uuid
 *          description: example primary key
 *          in: path
 *          type: string
 *          default: test
 *          required: true
 *      responses:
 *        204:
 *          description: user was updated
 */

router.put('/user/:uuid',
    // authenticate(),
    errors.wrap(async (req, res) => {
        const user = await models.User.findById(req.params.uuid);
        if (!user) throw errors.NotFoundError('user not found');

        const result = await user.update( req.body, { fields: [
            'firstName',
            'middleName',
            'lastName',
            'email',
            'phone1',
            'phone2',
            'role',
        ]} );
        
        res.json(result);
    })
);

module.exports = router;
