'use strict';

module.exports = (sequelize, Sequelize) => {
    const UsersProject = sequelize.define('users_projects', {
        uuid: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
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
      UsersProject.hasMany(models.User, {foreignKey: 'uuid', as: 'users_projects'});
    };
    UsersProject.associate = (models) => {
      UsersProject.hasMany(models.Project, {foreignKey: 'uuid', as: 'users_projects'});
    };

    return UsersProject;
};
