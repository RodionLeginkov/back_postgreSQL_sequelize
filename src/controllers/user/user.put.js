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

router.put('/user/:uuid',
    // authenticate(),
    errors.wrap(async (req, res) => {
        const user = await models.User.findByPk(req.params.uuid,
            {
                include: [{
                    model: models.Milestones,
                    as: 'Users_Milestones',
                    required: false,
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
        if (!user) throw errors.NotFoundError('user not found');

        const result = await user.update(req.body);
        
        res.json(result);
    })
);

module.exports = router;
