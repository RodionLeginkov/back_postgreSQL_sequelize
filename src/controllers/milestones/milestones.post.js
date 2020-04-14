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

        const result = await models.Milestones.create(info);
        const user = await models.User.findByPk(result.dataValues.user_uuid,
            {
                include: [{
                    model: models.Milestones,
                    as: 'Users_Milestones',
                    required: false,
                    // Pass in the Product attributes that you want to retrieve
                    // attributes: ['uuid', 'name']
            },
        ]
            });
        const milestones = user.Users_Milestones;
        let totalLoad = 0;
            for (let i = 0; i < milestones.length; i++) {
                totalLoad += milestones[i].load;
                }
        await user.update({total_load: totalLoad});
        // user.update({total_load: user.dataValues.total_load + result.dataValues.load});
        res.json(result);
    })
);

module.exports = router;
