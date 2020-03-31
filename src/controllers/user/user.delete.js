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

router.delete('/user/:uuid',
    // authenticate(),
    errors.wrap(async (req, res) => {
        const models = res.app.get('models');


        try {
            const users = await models.User.findById(req.params.uuid);
            if (!users) throw errors.NotFoundError('Example not found');
            
            // const tasks = await users.getTasks();
            const skills = await users.getSkills();
            const milestones = await users.getUsers_Milestones();
            // const userTasks = await project.getUserTask();
            // console.log(tasks);
            users.removeUsers_Milestones(milestones);
            users.removeSkills(skills);
            // const milestones = await models.Milestone.findAll({where: {'project_uuid': project.uuid}});
            // for (const milestone of milestones) {
            //     await models.MiestoneSkill.destroy({where: {'milestone_uuid': milestone.uuid}});
            // }
            // await models.Milestone.destroy({where: {'project_uuid': project.uuid}});

            await users.destroy();
        } catch (err) {
            console.log(err);
        }

        res.sendStatus(204);
    })
);

module.exports = router;
