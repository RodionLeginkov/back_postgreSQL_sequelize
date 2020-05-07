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
    authenticate(),
    errors.wrap(async (req, res) => {
        const models = res.app.get('models');
        const project = req.body;
        const existingProject = await models.Project.findOne({where: {name: project.name}});
        if (existingProject) throw errors.InvalidInputError('Project with same name already exists');
        const result = await models.Project.create(project);

        // console.log(req.body);
        // const milestones = req.body.Projects_Milestones;
        // milestones.forEach(async item => {
        //     item.project_uuid = result.uuid;
        //     let ProjectMilestones = await models.Milestone.create(item);
        // });

        // const persons = req.body.Person;
        // persons.forEach(async item =>{
        //     item.project_uuid = result.uuid;
        //     let ProjectPersons = await models.Person.create(item);
        // });
    
        const FrontProject = await models.Project.findByPk(result.uuid,
            {include: [{
                model: models.Skill,
                as: 'Skills',
                required: false,
                // Pass in the Product attributes that you want to retrieve
                // attributes: ['uuid', 'name'],
            },
            {
                model: models.Milestone,
                as: 'Projects_Milestones',
                required: false,
                include: [{
                    model: models.User,
                    as: 'Users',
                    required: false,
                }]
                // Pass in the Product attributes that you want to retrieve
                // attributes: ['uuid', 'name']
        }]});

        // console.log(FrontProject);
        res.json(FrontProject);
    })
);

module.exports = router;
