const authenticate = require('../../middleware/authenticate');
const errors = require('../../errors');
const router = require('express').Router();
/**
 *  @swagger
 *  /v1/example:
 *    get:
 *      tags:
 *        - example
 *      description: get list of examples
 *      responses:
 *        200:
 *          description: list of examples
 *          schema:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                uuid:
 *                  type: string
 *                  default: '003d3168-ffa3-4e9d-bccb-04f80cdec2ef'
 *                name:
 *                  type: string
 *                  default: 'name'
 *
 */

router.get('/v1/projects',
    // authenticate(),
    errors.wrap(async (req, res) => {
        const models = res.app.get('models');
        const projects = await models.Project.findAll();

        for (let project of projects) {
            const milestone = await models.Milestone.findOne({where: {uuid: project.currentMilestoneUuid}});
            const skills = await models.MiestoneSkill.findAll({where: {milestoneUuid: milestone.uuid}});
            project['dataValues']['milestone'] = milestone;
            project['dataValues']['skills'] = skills;
        }

        res.json(projects);
    })
);

module.exports = router;
