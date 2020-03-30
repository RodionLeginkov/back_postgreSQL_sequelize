const authenticate = require('../../middleware/authenticate');
const errors = require('../../errors');
const router = require('express').Router();
const multer = require('multer');

const storage = multer.diskStorage({
    filename: function(req, file, cb) {
 cb(null, req.params.uuid+'.jpeg');
},
    destination: 'shared/',
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});
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

router.put('/user/avatar/:uuid',
    // authenticate(),
    upload.single('avatar'),
    errors.wrap(async (req, res) => {
        const user = await models.User.findById(req.params.uuid);
        if (!user) throw errors.NotFoundError('user not found');
        const result = await user.update({avatar: `/users/avatar/${req.params.uuid}`});
        res.json(result);
    })
);

module.exports = router;
