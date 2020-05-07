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
        const projects = await models.Project.findAll({
        include: [{
            model: models.Skill,
            as: 'Skills',
            required: false,
        },
        {
            model: models.Milestone,
            as: 'ProjectMilestones',
            required: false,
            include: [{
                model: models.User,
                as: 'Users',
                required: false,
            }]
    },

    ],
    order: [['name', 'ASC']],
    });
        res.json(projects);
    })
);

module.exports = router;
