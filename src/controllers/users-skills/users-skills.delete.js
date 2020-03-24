const router = require('express').Router();
const errors = require('../../errors');
const authenticate = require('../../middleware/authenticate');
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

router.delete('/v1/users-skills/:skillUuid/:userUuid',
    // authenticate(),
    errors.wrap(async (req, res) => {
        const models = res.app.get('models');
        await models.UserSkill.destroy({ where: { "user_uuid": req.params.userUuid, "skill_uuid": req.params.skillUuid } });        
        res.sendStatus(204);
    })
);

module.exports = router;
