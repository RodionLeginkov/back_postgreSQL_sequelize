const router = require('express').Router();
const errors = require('../../errors');
const mandrill = require('mandrill-api/mandrill');

/**
 *  @swagger
 *  /forgotPass:
 *    post:
 *      tags:
 *        - user management
 *      description: reset password user
 *      parameters:
 *        - name: email
 *          default: JohnDoe@gmail.com
 *          required: true
 *          in: formData
 *          type: string
 *      responses:
 *        200:
 *          description: On your email send letter
 *        404:
 *          description: Email not found
 */

router.post('/forgotPass',
    errors.wrap(async (req, res) => {
        const models = res.app.get('models');

        const user = await models.User.findOne({where: {email: req.body.email}});
        
        if (!user) throw errors.NotFoundError('Email not found');
        /*
        send letter to mail 
        */

        const mandrill_client = new mandrill.Mandrill(process.env.MANDRILL_KEY);
        const message = {
            'html': '<p>Example HTML content</p>',
            'text': 'Example text content',
            'subject': 'example subject',
            'from_email': 'crm@exceedCRM.com',
            'from_name': 'Exampel',
            'to': [{
                    'email': 'nikolaymihaylov1337@gmail.com',
                    'name': 'Recipient Name',
                    'type': 'to'
                }]
        };
        mandrill_client.messages.send({'message': message}, function(result) {
        // console.log(result)
        res.send('On your email send letter');
        
        /*
            [{
                    "email": "recipient.email@example.com",
                    "status": "sent",
                    "reject_reason": "hard-bounce",
                    "_id": "abc123abc123abc123abc123abc123"
                }]
            */
        });
    })
);

module.exports = router;
