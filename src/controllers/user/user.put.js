const authenticate = require('../../middleware/authenticate');
const errors = require('../../errors');
const router = require('express').Router();
const arrangeInputs = require('../../middleware/arrange-inputs');
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

router.put('/user/:uuid',
    authenticate(),
    arrangeInputs('body', {
        firstName: {type: 'STRING', required: true},
        lastName: {type: 'STRING', required: true},
        password: {type: 'STRING'},
        role: {type: 'STRING', required: true},
        email: {type: 'STRING',
            required: false,
            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            transform: (val) => val.toLowerCase()
        }
    }),
    errors.wrap(async (req, res) => {
        const user = await models.User.findByPk(req.params.uuid,
            {
                include: [{
                    model: models.Milestones,
                    as: 'Users_Milestones',
                    required: false,
                    include: [{
                        model: models.Project,
                        as: 'Projects',
                        required: false,
                    }]
                    // Pass in the Product attributes that you want to retrieve
                    // attributes: ['uuid', 'name']
            },
        ]
            });
            delete req.body.password;
        // if (req.body.email !== null) {
        //     const validateEmail = (email) => (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email));
        //     if (!validateEmail(req.body.email)) throw errors.InvalidInputError('email is wrong'); 
        // }
        if (!user) throw errors.NotFoundError('user not found');
        console.log(req.body.password);
        const result = await user.update(req.body);
        
        res.json(result);
    })
);

module.exports = router;
