const router = require('express').Router();
const errors = require('../../errors');
const authenticate = require('../../middleware/authenticate');
const sequelize = require('sequelize');
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
        const sort = '', order = 0;
        let orderSort, changeorder='ASC', whereCondition = {};

        switch (sort) {
            case 'Load':
                orderSort = 'load';
            break;
            case 'rpd':
                orderSort = 'RPD';
            break;
            case 'Platform':
                orderSort = 'platform';
            break;
            case 'Withdraw':
                orderSort = 'withdraw';
            break;
            default:
                orderSort = 'project_uuid';
        }
        const models = res.app.get('models');
        const result = await models.Milestones.findAll(
            {
                raw: true,
                group: ['Milestones.uuid', 'Users.uuid', 'Projects.uuid'],
                attributes: ['uuid', 'user_uuid', 'project_uuid', 'role', 'rate', 
                'rate_type', 'load', 'platform', 
                'withdraw', 'start_date', 
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
                }],
                // order: [[orderSort, 'ASC']]
        });
        console.log(req.query);
        res.json(result);
    })
);


const rpdCount =`
CASE WHEN "Milestones"."rate_type" = 'flat_rate' then  "Milestones"."rate" / 20
    WHEN "Milestones"."rate_type" = 'weekly' then  "Milestones"."rate" / 20 
    WHEN "Milestones"."rate_type" = 'hourly' then  "Milestones"."rate" / "Milestones"."load"
   ELSE 0
END
`;


module.exports = router;
