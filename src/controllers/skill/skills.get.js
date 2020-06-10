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

router.get('/skills',
    authenticate(),
    errors.wrap(async (req, res) => {
        const models = res.app.get('models');
        const skills = await models.Skill.findAll({
            include: [{
                model: models.User,
                as: 'Users',
                required: false,
                attributes: {
                    exclude: ['password'] // Removing password from User response data
                }  
                // Pass in the Product attributes that you want to retrieve
                // attributes: ['uuid', 'name'],
            },
            {
                model: models.Project,
                as: 'Projects',
                required: false,
                // Pass in the Product attributes that you want to retrieve
                // attributes: ['uuid', 'name'],
            },
            
        ]});
        res.json(skills);
    })
);

module.exports = router;
