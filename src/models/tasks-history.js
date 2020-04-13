'use strict';

module.exports = (sequelize, Sequelize) => {
    const TasksHistory = sequelize.define('TasksHistory', {
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
        'creator_uuid': {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
              model: 'user',
              key: 'uuid',
          }
        },
        'text': {
            type: Sequelize.STRING(5000),
        },
        'createdAt': {
          type: Sequelize.DATE,
          field: 'created_at',
      },
      'updatedAt': {
          type: Sequelize.DATE,
          field: 'updated_at',
      },
  }, 
     {
        tableName: 'tasks_history',
        timestamps: true,
    });

    TasksHistory.associate = (models) => {
      TasksHistory.belongsTo(models.User, {
        as: 'Users',
        foreignKey: 'user_uuid',
      });
    //   Milestones.belongsTo(models.Project, {
    //         as: 'Projects',
    //         foreignKey: 'project_uuid',
    //       });
    // };
    };
    return TasksHistory;
  };
