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
        const milestone = await models.Milestone.findByPk(req.params.uuid);
        console.log(req.body);
       
        if (!milestone) throw errors.NotFoundError('Milestone not found');

        const result = await milestone.update(req.body);

        const user = await models.User.findByPk(result.dataValues.user_uuid,
        {
            include: [{
                    model: models.Milestone,
                    as: 'UserMilestones',
                    required: false,
            },
        ]

        });
        const milestones = user.UserMilestones;
            
        let totalLoad = 0;
            
        for (let i = 0; i < milestones.length; i++) {
            totalLoad += milestones[i].load;
            }
        await user.update({total_load: totalLoad}); 
        
        res.json(result);
    })
);

module.exports = router;
