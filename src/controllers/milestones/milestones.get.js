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

router.get('/milestones',
    // authenticate(),
    errors.wrap(async (req, res) => {
        const models = res.app.get('models');
        const result = await models.Milestones.findAll(
            {include: [{
                model: models.User,
                as: 'Users',
                required: false,
            },
            {
                model: models.Project,
                as: 'Projects',
                required: false,
            }]});
        res.json(result);
    })
);

module.exports = router;
