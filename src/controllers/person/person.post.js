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

router.post('/person',
    authenticate(),
    errors.wrap(async (req, res) => {
        // console.log('histoty', res.locals.user.dataValues.uuid);
        const models = res.app.get('models');
        const info = req.body;
    
        const result = await models.Person.create(info);
        res.json(result);
    })
);

module.exports = router;
