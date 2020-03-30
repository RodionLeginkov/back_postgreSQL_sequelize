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
 *          default: 
 *          required: true
 *          in: formData
 *          type: string
 *      responses:
 *        200:
 *          description: return saved report object
 */

router.post('/skill',
    // authenticate(),
    errors.wrap(async (req, res) => {
        const models = res.app.get('models');
        const skill = req.body;
        const existingSkill = await models.Skill.findOne({where: {name: skill.name}});
        if (existingSkill) throw errors.InvalidInputError('Filter with same name already exists');
        const result = await models.Skill.create(skill);
        res.json(result);
    })
);

module.exports = router;
