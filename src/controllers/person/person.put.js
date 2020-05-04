const authenticate = require('../../middleware/authenticate');
const errors = require('../../errors');
const router = require('express').Router();
/**
 *  @swagger
 *  /example/{uuid}:
 *    put:
 *      tags:
 *        - user
 *      description: put example
 *      parameters:
 *        - name: uuid
 *          description: example primary key
 *          in: path
 *          type: string
 *          default: test
 *          required: true
 *      responses:
 *        204:
 *          description: user was updated
 */

router.put('/person/:uuid',
    authenticate(),
    errors.wrap(async (req, res) => {
        const models = res.app.get('models');
        const person = await models.Person.findByPk(req.params.uuid);
        
        if (!person) throw errors.NotFoundError('person not found');

        const result = await person.update(req.body);

        res.json(result);
    })
);

module.exports = router;
