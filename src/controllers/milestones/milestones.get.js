const router = require('express').Router();
const errors = require('../../errors');
const authenticate = require('../../middleware/authenticate');
const sequelize = require('sequelize');
const {Op} = require('sequelize');
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

 // , [sequelize.fn('min', sequelize.col('rate')), 'RPD']
router.get('/milestones',
    // authenticate(),
    errors.wrap(async (req, res) => {
        const {sort, order} = req.query;
        let orderSort, changeorder='ASC', whereCondition = {};

        if (order === 'false') {
            changeorder='DESC';
        }

        switch (sort) {
            case 'load':
                orderSort = 'load';
            break;
            case 'rate':
                orderSort = 'rate';

            break;
            case 'rpd':
                orderSort = 'RPD';
            break;
            case 'platform':
                orderSort = 'platform';
            break;
            case 'withdraw':
                orderSort = 'withdraw';
            break;
            case 'startDate':
                orderSort = 'start_date';
            break;
            default:
                orderSort = 'project_uuid';
        }
        const models = res.app.get('models');
        const result = await models.Milestone.findAll(
            {
                // raw: true,
                group: ['Milestone.uuid', 'Users.uuid', 'Projects.uuid', 'Person.uuid', 'Person->Participants.uuid'],
                attributes: ['uuid', 'user_uuid', 'project_uuid', 'person_uuid', 'role', 'rate', 
                'rate_type', 'load', 'platform', 
                'withdraw', 'start_date', 'comment', 'participants',
                'end_date', [sequelize.literal(rpdCount), 'rpd']],
                
                include: [{
                    model: models.User,
                    // attributes: [],
                    as: 'Users',
                    required: false,
                },
                {
                    model: models.Project,
                    as: 'Projects',
                    // attributes: [],
                    required: false,
                },
                {
                    model: models.Person,
                    as: 'Person',
                    // attributes: [],
                    required: false,
                    include: [{
                        model: models.Participant,
                        as: 'Participants',
                        required: false,
                        
                    }]
                },
                
            ],
                where: {
                    [Op.and]: [{
                        load: {
                            [Op.not]: null,
                        }, 
                        load: {
                            [Op.not]: 0,
                        },  
                        rate: {
                            [Op.not]: null,
                        },  
                        rate: {
                            [Op.not]: 0,
                        },
                    }],    
            },
                order: [[sequelize.literal(orderSort), changeorder]]
        });
        // console.log("test")
        res.json(result);
    })
);

// 

const rpdCount =`
CASE WHEN "Milestone"."rate_type" = 'flat_rate' then  "Milestone"."rate" / 20
    WHEN "Milestone"."rate_type" = 'weekly' then  "Milestone"."rate" / "Milestone"."load"
    WHEN "Milestone"."rate_type" = 'hourly' then  "Milestone"."rate" * "Milestone"."load" /5 
    WHEN "Milestone"."rate_type" = 'fixed' AND "Milestone"."end_date" IS NOT null then "Milestone"."rate" * "Milestone"."load"/(("Milestone"."end_date")::date - ("Milestone"."start_date")::date)
    ELSE 0
END
`;


module.exports = router;
