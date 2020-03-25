'use strict';

module.exports = (sequelize, Sequelize) => {
    const UsersProject = sequelize.define('users_projects', {
        uuid: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        userUuid: {
          field: 'user_uuid',
          type: Sequelize.UUID,
          allowNull: false,
          references: {
              model: 'users',
              key: 'uuid',
          },
      },
      projectUuid: {
          field: 'project_uuid',
          type: Sequelize.UUID,
          allowNull: false,
          references: {
              model: 'projects',
              key: 'uuid',
          },
      },
        rate_type: {
            field: 'rate_type',
            type: Sequelize.STRING(64),
            allowNull: false,
        },
        rate: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        role: {
            type: Sequelize.STRING(64),
            allowNull: false,
        },
        load: {
          field: 'load',
          type: Sequelize.STRING(64),
          allowNull: false,
        },
      }, {
        tableName: 'users_projects',
        timestamps: false,
    });

    UsersProject.associate = (models) => {
      UsersProject.belongsTo(models.User, {foreignKey: 'uuid', as: 'users'});
      UsersProject.belongsTo(models.Project, {foreignKey: 'uuid', as: 'projects'});
    };

    return UsersProject;
};
