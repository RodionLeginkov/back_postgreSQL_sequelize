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

router.get('/history-tasks',
    authenticate(),
    errors.wrap(async (req, res) => {
        const models = res.app.get('models');
        const result = await models.TasksHistory.findAndCountAll(
            {include: [{
                model: models.User,
                as: 'Users',
                required: false,
                attributes: {
                    exclude: ['password'] // Removing password from User response data
                }  
                // Pass in the Product attributes that you want to retrieve
                // attributes: ['uuid', 'name'],
            }]});
        res.json(result);
    })
);

module.exports = router;
