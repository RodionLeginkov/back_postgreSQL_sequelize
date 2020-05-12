const authenticate = require('../../middleware/authenticate');
const errors = require('../../errors');
const router = require('express').Router();
/**
 *  @swagger
 *  /example/{uuid}:
 *    get:
 *      tags:
 *        - example
 *      description: get example record
 *      parameters:
 *        - name: uuid
 *          description: example primary key
 *          in: path
 *          type: string
 *          default: test
 *          required: true
 *      responses:
 *        200:
 *          description: example received
 */

router.get('/personsdsd/:uuid',
    // authenticate(),
    errors.wrap(async (req, res) => {
        const models = res.app.get('models');
        const result = await models.Person.findByPk(req.params.uuid, {include: [{
            model: models.Participant,
            as: 'Participants',
            required: false,
            // Pass in the Product attributes that you want to retrieve
            // attributes: ['uuid', 'name'],
        },
        ]});
        if (!result) throw errors.NotFoundError('Example not found');
        res.json(result);
    })
);

module.exports = router;
