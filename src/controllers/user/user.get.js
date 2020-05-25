const authenticate = require('../../middleware/authenticate');
const errors = require('../../errors');
const router = require('express').Router();
const {Op} = require('sequelize');
const Sequelize = require('sequelize');
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

        const search = req.query.filterRole;

                const whereCondition = search
        ? {
            [Op.or]: [{
                'end_date': {
                    [Op.gte]: search,
                }
            }]
        }
        : {};

        const user = await models.User.findByPk(req.params.uuid,
            {                
                
                   
                attributes: {exclude: ['password']},
                
                include: [{
                    model: models.Milestone,
                    as: 'UserMilestones',
                    required: false,
                    where: whereCondition,      
                    include: [{
                        model: models.Project,
                        as: 'Projects',
                        required: false,
                        include: [{
                            model: models.Person,
                            as: 'Person',
                            required: false,
                        }
                    ],
                    }
                
                ]
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
        ],
    });

            if (!user) throw errors.NotFoundError('Example not found');
           
            const milestones = user.UserMilestones;
            let totalLoad = 0;
            
            for (let i = 0; i < milestones.length; i++) {
                totalLoad += milestones[i].load;
                }
        
            const result = await user.update({total_load: totalLoad});
            res.json(result);
    })

);


// const whereByDate =`
// (    SELECT *
//     FROM milestones AS m
//     LEFT JOIN  users u on m.user_uuid = u.uuid
//     LEFT  JOIN persons AS p ON p."uuid" = m.person_uuid
//     WHERE  (DATE_PART('year', CURRENT_TIMESTAMP) - DATE_PART('year', m.end_date)) * 12 +(DATE_PART('month', CURRENT_TIMESTAMP) - DATE_PART('month', m.end_date)) > 12
//     ) 
// `;
    
    module.exports = router;
