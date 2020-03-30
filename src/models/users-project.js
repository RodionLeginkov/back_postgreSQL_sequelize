'use strict';

module.exports = (sequelize, Sequelize) => {
    const UsersProject = sequelize.define('UsersProject', {
        uuid: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        user_uuid: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
              model: 'User',
              key: 'uuid',
          },
      },
      project_uuid: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
              model: 'Project',
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
      UsersProject.belongsTo(models.User, {foreignKey: 'user_uuid', as: 'User'});
      UsersProject.belongsTo(models.Project, {foreignKey: 'project_uuid', as: 'Project'});
    };

    return UsersProject;
};
