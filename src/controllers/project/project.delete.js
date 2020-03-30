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
            const project = await models.Project.findById(req.params.uuid);
            if (!project) throw errors.NotFoundError('Example not found');
            
            const users = await project.getUsers();
            const tasks = await project.getTasks();
            const skills = await project.getSkills();
            // const userTasks = await project.getUserTask();
            console.log(tasks);
            project.removeUsers(users);
            project.removeSkills(skills);
            // project.removeTasks(tasks);
            // const milestones = await models.Milestone.findAll({where: {'project_uuid': project.uuid}});
            // for (const milestone of milestones) {
            //     await models.MiestoneSkill.destroy({where: {'milestone_uuid': milestone.uuid}});
            // }
            // await models.Milestone.destroy({where: {'project_uuid': project.uuid}});

            await project.destroy();
            // res.send('Project deleted');
        } catch (err) {
            console.log(err);
        }

        res.sendStatus(204);
    })
);

module.exports = router;
