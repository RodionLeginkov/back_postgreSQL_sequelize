const authenticate = require('../../middleware/authenticate');
const errors = require('../../errors');
const router = require('express').Router();
/**
 *  @swagger
 *  /example/{uuid}:
 *    put:
 *      tags:
 *        - user
 *      description: put example
 *      parameters:
 *        - name: uuid
 *          description: example primary key
 *          in: path
 *          type: string
 *          default: test
 *          required: true
 *      responses:
 *        204:
 *          description: user was updated
 */

router.put('/project/:uuid',
    // authenticate(),
    errors.wrap(async (req, res) => {
        const project = await models.Project.findById(req.params.uuid);
        if (!project) throw errors.NotFoundError('user not found');

        const result = await project.update( req.body, { fields: [
                'uuid',
                'name',
                'source',
                'current_milestone_id'
            ]} );

        res.json(result);
    })
);

module.exports = router;
