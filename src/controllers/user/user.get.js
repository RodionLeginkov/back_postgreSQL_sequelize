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

router.get('/user/:uuid',

    authenticate(),
    errors.wrap(async (req, res) => {
        const models = res.app.get('models');
        const user = await models.User.findByPk(req.params.uuid,
            {
                include: [{
                    model: models.Milestones,
                    as: 'Users_Milestones',
                    required: false,
                    include: [{
                        model: models.Project,
                        as: 'Projects',
                        required: false,
                    }]
                    // Pass in the Product attributes that you want to retrieve
                    // attributes: ['uuid', 'name']
            },
             {                
                model: models.Skill,
                as: 'Skills',
                required: false,
                // Pass in the Product attributes that you want to retrieve
                // attributes: ['uuid', 'name']
            },
        ]
            });
            if (!user) throw errors.NotFoundError('Example not found');
            console.log('userGet', req.headers);
        res.json(user);
    })

);

module.exports = router;
