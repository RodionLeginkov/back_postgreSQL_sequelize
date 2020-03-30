const router = require('express').Router();
const errors = require('../../errors');
const authenticate = require('../../middleware/authenticate');
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

router.delete('/users-projects/:user_uuid/:task_uuid',
    // authenticate(),
    errors.wrap(async (req, res) => {
        const models = res.app.get('models');
        await models.UserTask.destroy({where: {'user_uuid': req.params.user_uuid, 'task_uuid': req.params.project_uuid}});        
        res.send('delete');
    })
);

module.exports = router;
