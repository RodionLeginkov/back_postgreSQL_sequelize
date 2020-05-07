const authenticate = require('../../middleware/authenticate');
const errors = require('../../errors');
const router = require('express').Router();
/**
 *  @swagger
 *  /example/{uuid}:
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

router.delete('/project/:uuid',
   authenticate(),
    errors.wrap(async (req, res) => {
        const models = res.app.get('models');

            const project = await models.Project.findByPk(req.params.uuid);

            if (!project) throw errors.NotFoundError('Project not found');
            
            const milestones = await project.getProjectMilestones();
            const skills = await project.getSkills();
            const person = await project.getPerson();
            if (Object.keys(milestones).length) throw errors.InvalidInputError('Milestones exists');
            await project.removeSkills(skills);
            await project.removePerson(person);
            // project.removeTasks(tasks);
            // const milestones = await models.Milestone.findAll({where: {'project_uuid': project.uuid}});
            // for (const milestone of milestones) {
            //     await models.MiestoneSkill.destroy({where: {'milestone_uuid': milestone.uuid}});
            // }
            // await models.Milestone.destroy({where: {'project_uuid': project.uuid}});

            await project.destroy();

            // res.send('Project deleted');

        res.sendStatus(204);
    })
);

module.exports = router;
