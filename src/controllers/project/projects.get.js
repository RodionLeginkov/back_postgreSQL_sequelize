const authenticate = require('../../middleware/authenticate');
const errors = require('../../errors');
const router = require('express').Router();
/**
 *  @swagger
 *  /example:
 *    get:
 *      tags:
 *        - example
 *      description: get list of examples
 *      responses:
 *        200:
 *          description: list of examples
 *          schema:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                uuid:
 *                  type: string
 *                  default: '003d3168-ffa3-4e9d-bccb-04f80cdec2ef'
 *                name:
 *                  type: string
 *                  default: 'name'
 *
 */

router.get('/projects',
    authenticate(),
    errors.wrap(async (req, res) => {
        const models = res.app.get('models');
        const sequelize = res.app.get('sequelize');
        const {Op} = require('sequelize');
        const {active} = req.query;


        const total = await sequelize.query(
            `			

            select total.uuid FROM(SELECT projects.uuid,count(m.status) as active
            from projects
            left join milestones m on projects.uuid = m.project_uuid
            where m.status = 'Active'
            group by projects.uuid) as total
            where total.active > 0
            ;`,
            {type: sequelize.QueryTypes.SELECT},
        ).map((item)=> (item.uuid));

        let whereCondition = {};
        if (active === 'Active') {
            whereCondition={
                [Op.or]: [{
                    uuid: {
                        [Op.in]: total,
                    } 
                }]
            };
        } else if (active === 'Archived') {
            whereCondition={
                [Op.or]: [{
                    uuid: {
                        [Op.notIn]: total,
                    } 
                }]
            };
        }


        const projects = await models.Project.findAll({
        include: [{
            model: models.Skill,
            as: 'Skills',
            required: false,
        },
        {
            model: models.Person,
            as: 'Person',
            required: false,
        },
        {
            model: models.Milestone,
            as: 'ProjectMilestones',
            include: [{
                model: models.User,
                as: 'Users',
                required: false,
                attributes: {
                    exclude: ['password'] // Removing password from User response data
                }  
            }]
        },
        
    ],
    where: whereCondition,
    order: [['name', 'ASC']],
    });
        res.json(projects);
    })
);

module.exports = router;
