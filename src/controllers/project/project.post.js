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

router.post('/v1/project',
    // authenticate(),
    errors.wrap(async (req, res) => {
        const models = res.app.get('models');
        const project = req.body;

        const existingProject = await models.Project.findOne({where: {name: project.name}});
        if (existingProject) throw errors.InvalidInputError('Filter with same name already exists');
        const result = await models.Project.create(project);
        const defaultMilestone = await models.Milestone.create({projectUuid: result['dataValues']['uuid']});

        await models.Project.update(
            {currentMilestoneUuid: defaultMilestone['dataValues']['uuid']},
            {where: {uuid: result['dataValues']['uuid']}}
        );

        res.json(defaultMilestone);
    })
);

module.exports = router;
