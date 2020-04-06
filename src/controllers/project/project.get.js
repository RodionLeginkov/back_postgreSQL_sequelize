const authenticate = require('../../middleware/authenticate');
const errors = require('../../errors');
const router = require('express').Router();
const roles = require('../../enums/user-roles');
/**
 *  @swagger
 *  /example/{uuid}:
 *    get:
 *      tags:
 *        - example
 *      description: get example record
 *      parameters:
 *        - name: uuid
 *          description: example primary key
 *          in: path
 *          type: string
 *          default: test
 *          required: true
 *      responses:
 *        200:
 *          description: example received
 */


router.get('/project/:uuid',
    // authenticate([roles.MANAGER, roles.STAFF]),
    errors.wrap(async (req, res) => {
        const models = res.app.get('models');
        const project = await models.Project.findByPk(req.params.uuid,
            {include: [{
                model: models.Skill,
                as: 'Skills',
                required: false,
                // Pass in the Product attributes that you want to retrieve
                // attributes: ['uuid', 'name'],
            },
            {
                model: models.Milestones,
                as: 'Projects_Milestones',
                required: false,
                
                // Pass in the Product attributes that you want to retrieve
                // attributes: ['uuid', 'name']
        }]});
        if (!project) throw errors.NotFoundError('Example not found');
        res.json(project);
    })
);

module.exports = router;
