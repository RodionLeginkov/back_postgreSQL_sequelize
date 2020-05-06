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

    // authenticate(),
    errors.wrap(async (req, res) => {
        const models = res.app.get('models');
        const user = await models.User.findByPk(req.params.uuid,
            {
                include: [{
                    model: models.Milestone,
                    as: 'Users_Milestones',
                    required: false,
                    include: [{
                        model: models.Project,
                        as: 'Projects',
                        required: false,
                    }]
            },
             {                
                model: models.Skill,
                as: 'Skills',
                required: false,
            },
            {
                model: models.TasksHistory,
                as: 'UsersTasks',
                foreignKey: 'user_uuid',
            },
            {
                model: models.TasksHistory,
                as: 'TasksCreator',
                foreignKey: 'creator_uuid',
            },
        ]
            });

            if (!user) throw errors.NotFoundError('Example not found');
           
            const milestones = user.Users_Milestones;
            let totalLoad = 0;
            
            for (let i = 0; i < milestones.length; i++) {
                totalLoad += milestones[i].load;
                }
        
            const result = await user.update({total_load: totalLoad});
            res.json(result);
    })

);

module.exports = router;
