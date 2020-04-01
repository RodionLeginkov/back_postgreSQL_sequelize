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

router.put('/skill/:uuid',
    // authenticate(),
    errors.wrap(async (req, res) => {
        const user = await models.Skill.findByPk(req.params.uuid);
        if (!user) throw errors.NotFoundError('user not found');

        const result = await user.update(req.body);

        res.json(result);
    })
);

module.exports = router;
