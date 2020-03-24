const authenticate = require('../../middleware/authenticate');
const errors = require('../../errors');
const router = require('express').Router();
/**
 *  @swagger
 *  /v1/example/{uuid}:
 *    delete:
 *      tags:
 *        - example
 *      description: delete example
 *      parameters:
 *        - name: uuid
 *          description: example primary key
 *          in: path
 *          type: string
 *          default: test
 *          required: true
 *      responses:
 *        204:
 *          description: example was deleted
 */

router.delete('/v1/user/:uuid',
    // authenticate(),
    errors.wrap(async (req, res) => {
        const models = res.app.get('models');

        try {
            await models.UserSkill.destroy({ where: { "user_uuid": req.params.uuid } });
            const user = await models.User.findById(req.params.uuid);
            if (!user) throw errors.NotFoundError('Example not found');
            await user.destroy();
        } catch (err) {
            console.log(err);
        }

        res.sendStatus(204);
    })
);

module.exports = router;
