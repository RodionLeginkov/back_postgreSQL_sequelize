'use strict';

module.exports = (sequelize, Sequelize) => {
    const Milestones = sequelize.define('Milestones', {
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

    Milestones.associate = (models) => {
      Milestones.belongsTo(models.User, {
        as: 'Users',
        foreignKey: 'user_uuid',
      });
      Milestones.belongsTo(models.Project, {
            as: 'Projects',
            foreignKey: 'project_uuid',
          });
    };

    return Milestones;
};
