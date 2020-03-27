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

router.post('/project',
    // authenticate(),
    errors.wrap(async (req, res) => {
        const models = res.app.get('models');
        const project = req.body;
        const existingProject = await models.Project.findOne({where: {name: project.name}});
        if (existingProject) throw errors.InvalidInputError('Filter with same name already exists');
        const result = await models.Project.create(project);
        res.json(result);
    })
);

module.exports = router;
