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

router.post('/project',
    // authenticate(),
    errors.wrap(async (req, res) => {
        const models = res.app.get('models');
        const project = req.body;
        console.log(req.body);
        const existingProject = await models.Project.findOne({where: {name: project.name}});
        if (existingProject) throw errors.InvalidInputError('Filter with same name already exists');
        const result = await models.Project.create(project);
        console.log('dataValues:', result.uuid);
        // console.log(req.body.Projects_Milestones);
        // console.log(req.body.Projects_Milestones.length);
        const milestones = req.body.Projects_Milestones;
        milestones.forEach(async item => {
            item.project_uuid = result.uuid;
            let ProjectMilestones = await models.Milestones.create(item);
            // console.log('test', item);
        });


        res.json(result);
    })
);

module.exports = router;
