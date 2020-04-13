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
           // console.log("sdfsdf",req);
        let page =0, pageSize =0, filterRole = req.query.filterRole, filterBar = req.query.filterBar, sort = req.query.sort;
        let IAdebil = 'first_name';
        // console.log('searchTypeof', typeof(search));
        console.log('yesy', req.query);
        // console.log(req.headers)
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
        if (sort === 'Role') {
            IAdebil = orderByRole;
        } else if (sort === 'Name') {
            IAdebil='first_name';
        }
         let whereCondition = {};
         console.log('FilterRole', filterRole, 'Filterbar', filterBar);
         if (filterRole === 'Developers') {
 whereCondition = {
            [Op.or]: [{
                [Op.and]: [{
                    role: {
                        [Op.iLike]: {[Op.any]: ['team_leader', 'middle_developer', 'junior_developer', 'senior_developer', 'intern']},
                    },
                    firstName: {
                    [Op.iLike]: `${filterBar}%`,
                },
                }]}, {
                [Op.and]: [{
                    role: {
                        [Op.iLike]: {[Op.any]: ['team_leader', 'middle_developer', 'junior_developer', 'senior_developer', 'intern']},
                    },
                    lastName: {
                    [Op.iLike]: `${filterBar}%`,
                },
                }]}

 ]
         };
} else if (filterRole === 'manager') {
whereCondition = {
    [Op.or]: [{
        [Op.and]: [{
            role: {
                [Op.iLike]: {[Op.any]: ['ceo', 'cto', 'hr_manager', 'sales_manager', 'office_manager']},
            },
            firstName: {
            [Op.iLike]: `${filterBar}%`,
        },
        }]}, {
        [Op.and]: [{
            role: {
                [Op.iLike]: {[Op.any]: ['ceo', 'cto', 'hr_manager', 'sales_manager', 'office_manager']},
            },
            lastName: {
            [Op.iLike]: `${filterBar}%`,
        },
        }]}

]
 };
} else if (filterRole === '' ) {
 whereCondition = {
            [Op.or]: [{
                firstName: {
                    [Op.iLike]: `${filterBar}%`,
                }
            }, {
                lastName: {
                     [Op.iLike]: `${filterBar}%`,
             }
         }]
};
}
        const users = await models.User.findAll({
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
        {
            model: models.TasksHistory,
            as: 'UsersTasks',
            foreignKey: 'user_uuid',
        },
        {
            model: models.TasksHistory,
            as: 'TasksCreator',
            foreignKey: 'creator_uuid',
        },
         {                
            model: models.Skill,
            as: 'Skills',
            required: false,
            // Pass in the Product attributes that you want to retrieve
            // attributes: ['uuid', 'name']    
        }],
           order: [[Sequelize.literal(IAdebil)], ['first_name', 'ASC'], ['last_name', 'ASC']],
           where: whereCondition,
            // ...paginate({page,pageSize}),
            distinct: true,
        });
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
// const whereCondition =
// `
// case WHEN "search" = ''
// `;

module.exports = router;
