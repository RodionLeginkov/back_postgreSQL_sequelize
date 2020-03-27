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

router.post('/milestone',
    // authenticate(),
    errors.wrap(async (req, res) => {
        const models = res.app.get('models');
        const milestone = req.body;
        const existingMilestone = await models.Milestone.findOne({where: {name: milestone.name}});
        if (existingMilestone) throw errors.InvalidInputError('Filter with same name already exists');
        const result = await models.Milestone.create(milestone);
        res.json(result);
    })
);

module.exports = router;
