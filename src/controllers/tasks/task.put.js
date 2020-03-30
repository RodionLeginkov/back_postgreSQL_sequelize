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

router.put('/task/:uuid',
    // authenticate(),
    errors.wrap(async (req, res) => {
      const tasks = await models.Task.findById(req.params.uuid);
      if (!tasks) throw errors.NotFoundError('user not found');

      const result = await tasks.update( req.body);

      res.json(result);
    })
);

module.exports = router;
