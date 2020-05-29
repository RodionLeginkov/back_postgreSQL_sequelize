const authenticate = require('../../middleware/authenticate');
const errors = require('../../errors');
const router = require('express').Router();
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

router.get('/milestone/:uuid',
    // authenticate(),
    errors.wrap(async (req, res) => {
        const models = res.app.get('models');
        const user = await models.Milestone.findByPk(req.params.uuid,
            {include: [{
                model: models.User,
                as: 'Users',
                required: false,
                attributes: {
                    exclude: ['password'] // Removing password from User response data
                }  
                // Pass in the Product attributes that you want to retrieve
                // attributes: ['uuid', 'name'],
            },
            {
                model: models.Project,
                as: 'Projects',
                required: false,
                // Pass in the Product attributes that you want to retrieve
                // attributes: ['uuid', 'name'],
            }]});
        if (!user) throw errors.NotFoundError('Milestone not found');
        res.json(user);
    })
);

module.exports = router;
