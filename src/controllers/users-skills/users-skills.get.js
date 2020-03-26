const router = require('express').Router();
const errors = require('../../errors');
const authenticate = require('../../middleware/authenticate');
/**
 *  @swagger
 *  /v1/skill:
 *    post:
 *      tags:
 *        - skill
 *      description: save report
 *      parameters:
 *        - name: name
 *          default: react
 *          required: true
 *          in: formData
 *          type: string
 *      responses:
 *        200:
 *          description: return saved report object
 */

router.get('/v1/get-users-skills',
    // authenticate(),
    errors.wrap(async (req, res) => {
        const models = res.app.get('models');
        const result = await models.UserSkill.findAll({where: {userUuid: req.body.userUuid}});
        res.json(result);
    })
);

module.exports = router;
