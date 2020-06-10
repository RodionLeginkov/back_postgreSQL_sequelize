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

router.delete('/milestone/:uuid',
    authenticate(),
    errors.wrap(async (req, res) => {
        const milestone = await models.Milestone.findByPk(req.params.uuid);
        if (!milestone) throw errors.NotFoundError('Milestone not found');
        // const users = await milestone.getUsers();
        // const project = await milestone.getProjects();


        await milestone.destroy();


        res.sendStatus(204);
    })
);

module.exports = router;
