const router = require('express').Router();
const errors = require('../../errors');
const authenticate = require('../../middleware/authenticate');
/**
 *  @swagger
 *  /skill:
 *    post:
 *      tags:
 *        - skill
 *      description: save report
 *      parameters:
 *        - name: name
 *          default: react
 *          required: true
 *          in: formData
 *          type: string
 *      responses:
 *        200:
 *          description: return saved report object
 */

router.post('/milestones',
    // authenticate(),
    errors.wrap(async (req, res) => {
        const models = res.app.get('models');
        const info = req.body;

        const result = await models.Milestone.create(info);
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
