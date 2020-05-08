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

router.put('/participant/:uuid',
    authenticate(),
    errors.wrap(async (req, res) => {
        const models = res.app.get('models');
        const participant = await models.Participant.findByPk(req.params.uuid);
        
        if (!participant) throw errors.NotFoundError('person not found');

        const result = await participant.update(req.body);

        res.json(result);
    })
);

module.exports = router;
