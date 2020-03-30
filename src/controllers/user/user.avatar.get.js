const authenticate = require('../../middleware/authenticate');
const errors = require('../../errors');
const router = require('express').Router();
const path = require('path');
/**
 *  @swagger
 *  /users/{uuid}/avatar:
 *    put:
 *      tags:
 *        - example
 *      description: put example
 *      parameters:
 *         name: uuid,
 *         avatar: file
 *      responses:
 *        204:
 *          description: example was updated
 */

router.get('/user/avatar/:uuid',
    // authenticate(),
    errors.wrap(async (req,res) => {
        file = path.resolve(process.env.FILE_URL);
        res.sendfile(file+'/'+req.params.uuid+'.jpeg');
    })
);

module.exports = router;
