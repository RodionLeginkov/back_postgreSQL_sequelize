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
        const result = await models.Milestones.findAll(
            {
                raw: true,
                group: ['Milestones.uuid', 'Users.uuid', 'Projects.uuid'],
                attributes: ['uuid', 'user_uuid', 'project_uuid', 'role', 'rate', 
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
                }],
                order: [[sequelize.literal(orderSort), changeorder]]
        });
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
