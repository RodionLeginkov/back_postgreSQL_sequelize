'use strict';

module.exports = (sequelize, Sequelize) => {
    const Milestone = sequelize.define('Milestone', {
        'uuid': {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        'user_uuid': {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
              model: 'user',
              key: 'uuid',
          }
        },
        'project_uuid': {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
                model: 'project',
                key: 'uuid',
            }
        },
        'person_uuid': {
            type: Sequelize.UUID,
            references: {
                model: 'persons',
                key: 'uuid',   
            }     
        },
        'role': {
            type: Sequelize.STRING(50),
        },
        'rate': {
            type: Sequelize.INTEGER,
        },
        'rate_type': {
            type: Sequelize.STRING(15),
        },
        'load': {
          type: Sequelize.INTEGER,
        },
        'platform': {
        type: Sequelize.STRING(64),
        },
        'withdraw': {
            type: Sequelize.STRING(64),
        },
        'comment': {
            type: Sequelize.STRING(255),
        },
        'participants': {
            type: Sequelize.STRING(255),
        },
        'status': {
            type: Sequelize.STRING(20),
        },
        'start_date': {
          type: Sequelize.DATE,
          field: 'start_date',
      },
      'end_date': {
          type: Sequelize.DATE,
          field: 'end_date',
      },
    }, {
        tableName: 'milestones',
        timestamps: false,
    });

    Milestone.associate = (models) => {
        Milestone.belongsTo(models.User, {
        as: 'Users',
        foreignKey: 'user_uuid',
      });
      Milestone.belongsTo(models.Project, {
        as: 'Projects',
        foreignKey: 'project_uuid',
    });
    
    Milestone.belongsTo(models.Person, {
        as: 'Person',
        foreignKey: 'person_uuid',
    });
    };
    

    return Milestone;
};
