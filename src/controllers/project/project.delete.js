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
    // authenticate(),
    errors.wrap(async (req, res) => {
        const models = res.app.get('models');

        try {
            const project = await models.Project.findByPk(req.params.uuid);
            console.log('hello');
            if (!project) throw errors.NotFoundError('Example not found');
            
            const milestones = await project.getProjects_Milestones();
            const skills = await project.getSkills();
            // const userTasks = await project.getUserTask();
            console.log('TEST', Object.keys(milestones).length);
            if (Object.keys(milestones).length) throw errors.InvalidInputError('Milestones exists');
            project.removeSkills(skills);
            // project.removeTasks(tasks);
            // const milestones = await models.Milestone.findAll({where: {'project_uuid': project.uuid}});
            // for (const milestone of milestones) {
            //     await models.MiestoneSkill.destroy({where: {'milestone_uuid': milestone.uuid}});
            // }
            // await models.Milestone.destroy({where: {'project_uuid': project.uuid}});

            await project.destroy();
            // console.log("hello")
            // res.send('Project deleted');
        } catch (err) {
            console.log(err);
        }

        res.sendStatus(204);
    })
);

module.exports = router;
