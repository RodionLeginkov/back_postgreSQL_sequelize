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

router.delete('/task/:uuid',
    // authenticate(),
    errors.wrap(async (req, res) => {
        const task = await models.Task.findById(req.params.uuid);
        if (!task) throw errors.NotFoundError('Example not found');
        
        const users = await task.getUsers();
        task.removeUsers(users);
        await task.destroy();
        res.sendStatus(204);
    })
);

module.exports = router;
