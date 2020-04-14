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

router.put('/milestone/:uuid',
    // authenticate(),
    errors.wrap(async (req, res) => {
        const milestone = await models.Milestones.findByPk(req.params.uuid);
       
        if (!milestone) throw errors.NotFoundError('user not found');

        const result = await milestone.update(req.body);

        const user = await models.User.findByPk(result.dataValues.user_uuid,
        {
            include: [{
                    model: models.Milestones,
                    as: 'Users_Milestones',
                    required: false,
            },
        ]
        });
        
        const milestones = user.Users_Milestones;
            
        let totalLoad = 0;
            
        for (let i = 0; i < milestones.length; i++) {
            totalLoad += milestones[i].load;
            }
        await user.update({total_load: totalLoad}); 
        
        res.json(result);
    })
);

module.exports = router;
