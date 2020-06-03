const authenticate = require('../../middleware/authenticate');
const errors = require('../../errors');
const router = require('express').Router();
const path = require('path');
const multer = require('multer');
const aws = require('aws-sdk');


const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
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
    upload.single('avatar'),
    // authenticate(),
    errors.wrap(async (req, res) => {
        const models = res.app.get('models');
        const id = req.params.uuid;


        const file = req.file;
        console.log(file);
        const s3FileURL = process.env.AWS_Uploaded_File_URL_LINK;
        let s3bucket = new aws.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION
        });
        
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: file.originalname,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: 'public-read'
        };

        s3bucket.upload(params, async(err, data) =>{
          if (err) res.status(500).json({error: true, Message: err});
          else {
            const user = await models.User.findByPk(id);

          
            await user.update({
              avatar: data.Location
            });

            res.status(200).json(user);
        }
    });
    }));

module.exports = router;
