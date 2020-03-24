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

router.post('/v1/users-skills',
    // authenticate(),
    errors.wrap(async (req, res) => {
        const models = res.app.get('models');

        const skills = req.body.userSkills;
        const userUuid = req.body.userUuid;

        await models.UserSkill.destroy({ where: { "user_uuid": userUuid } });

        console.log(skills)

        for (const skill of skills) {
            await models.UserSkill.create({ userUuid: userUuid, skillUuid: skill.uuid });
        }
        res.sendStatus(200);
    })
);

module.exports = router;
