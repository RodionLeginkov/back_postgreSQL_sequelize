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
    authenticate(),
    errors.wrap(async (req, res) => {
        const models = res.app.get('models');

            const users = await models.User.findByPk(req.params.uuid);
            if (!users) throw errors.NotFoundError('Example not found');
            
            const skills = await users.getSkills();
            const milestones = await users.getUserMilestones();
            const task = await users.getUsersTasks();
            const taskCreator = await users.getTasksCreator();
            // const userTasks = await project.getUserTask();
            if (Object.keys(milestones).length) throw errors.InvalidInputError('Milestones exists');
            // users.removeUserMilestones(milestones);
            await users.removeSkills(skills);
            await users.removeTasksCreator(taskCreator);
            await users.removeUsersTasks(task);
           
            await users.destroy();

        res.sendStatus(204);
    })
);

module.exports = router;
