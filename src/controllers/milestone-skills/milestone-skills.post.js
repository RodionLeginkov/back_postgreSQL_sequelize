const router = require('express').Router();
const errors = require('../../errors');
const authenticate = require('../../middleware/authenticate');
/**
 *  @swagger
 *  /skill:
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

router.post('/milestone-skills',
    // authenticate(),
    errors.wrap(async (req, res) => {
        const models = res.app.get('models');

        const skills = req.body.milestoneSkills;
        const milestoneUuid = req.body.milestoneUuid;

        await models.MiestoneSkill.destroy({ where: { milestoneUuid : milestoneUuid } });

        for (const skill of skills) {
            await models.MiestoneSkill.create({ milestoneUuid: milestoneUuid, skillUuid: skill.uuid });
        }
        res.sendStatus(200);
    })
);

module.exports = router;
