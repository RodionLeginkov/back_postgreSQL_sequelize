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

router.delete('/skill/:uuid',
    // authenticate(),
    errors.wrap(async (req, res) => {
        const skill = await models.Skill.findById(req.params.uuid);
        if (!skill) throw errors.NotFoundError('Example not found');
        
        const users = await skill.getUsers();
        const project = await skill.getProjects();
        skill.removeUsers(users);
        skill.removeProjects(project);
        await skill.destroy();
        res.sendStatus(204);
    })
);

module.exports = router;
