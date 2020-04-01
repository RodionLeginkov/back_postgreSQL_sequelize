const authenticate = require('../../middleware/authenticate');
const errors = require('../../errors');
const router = require('express').Router();
const Sequelize = require('sequelize');
const {Op} = require('sequelize');
const {paginate} = require('../../../utils/pagination');

/**
 *  @swagger
 *  /example:
 *    get:
 *      tags:
 *        - example
 *      description: get list of examples
 *      responses:
 *        200:
 *          description: list of examples
 *          schema:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                uuid:
 *                  type: string
 *                  default: '003d3168-ffa3-4e9d-bccb-04f80cdec2ef'
 *                name:
 *                  type: string
 *                  default: 'name'
 *
 */
// const users = await models.User.findAll({
//     include: [{
//         model: models.Skill,
//         as: 'Skills',
//         required: false,
//         // Pass in the Product attributes that you want to retrieve
//         attributes: ['uuid', 'name'],
//     }]
// });
router.get('/users',
    // authenticate(),
    errors.wrap(async (req, res) => {
            const models = res.app.get('models');
            //console.log(req);
        let page =0, pageSize =0,search = 'managers';
                // const whereCondition = search
        // ? {
        //     [Op.or]: [{
        //         'fname': {
        //             [Op.iLike]: `${search}%`,
        //         }
        //     }, {
        //         'lname': {
        //             [Op.iLike]: `${search}%`,
        //         }
        //     }, {
        //         'email': {
        //             [Op.iLike]: `${search}%`,
        //         }
        //     }]
        // }
        // : {};
         let whereCondition = {};
        // : {};
         if (search === 'developers') { whereCondition = {
            [Op.or]: {
                role: {
                    [Op.iLike]: {[Op.any]: ['team_leader', 'middle_developer','junior_developer','senior_developer','intern']},
                }
            }
         }}
         else if (search === 'managers'){ whereCondition = {
            [Op.or]:{
                role: {
                    [Op.iLike]: {[Op.any]: ['ceo','cto','hr_manager','sales_manager','office_manager']},
                }
            }
         }}

        const users = await models.User.findAll({
            include: [{
                model: models.Milestones,
                as: 'Users_Milestones',
                required: false,
                // Pass in the Product attributes that you want to retrieve
                // attributes: ['uuid', 'name']
        },
         {                
            model: models.Skill,
            as: 'Skills',
            required: false,
            // Pass in the Product attributes that you want to retrieve
            // attributes: ['uuid', 'name']    
        }],
           order: [[Sequelize.literal(orderByRole)], ['first_name','ASC'],['last_name','ASC']],
           where:whereCondition,
            ...paginate({page,pageSize}),
            distinct: true,
        });
        // console.log(req);
        res.json(users);
    })
);


const orderByRole = `
CASE WHEN "User"."role" = 'ceo' THEN 1 
     WHEN "User"."role" = 'cto' THEN 2 
     WHEN "User"."role" = 'hr_manager' THEN 3
     WHEN "User"."role" = 'sales_manager' THEN 4
     WHEN "User"."role" = 'office_manager' THEN 5  
     WHEN "User"."role" = 'team_leader' THEN 6
     WHEN "User"."role" = 'senior_developer' THEN 6
     WHEN "User"."role" = 'middle_developer' THEN 7
     WHEN "User"."role" = 'junior_developer' THEN 9  
     WHEN "User"."role" = 'intern' THEN 10  
     ELSE 11
END ASC
`;
const whereCondition =
`
case WHEN "search" = ''
`

module.exports = router;
