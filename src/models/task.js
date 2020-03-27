'use strict';

module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define('Task', {
        uuid: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        project_uuid: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
                model: 'project',
                key: 'uuid',
            }
        },
        name: {
            type: Sequelize.STRING(64),
            allowNull: false,
        },
        description: {
            type: Sequelize.STRING,
        },
        status: {
            type: Sequelize.STRING(64),
        },
    }, {
        tableName: 'tasks',
        timestamps: false,
    });

    // Task.associate = (models) => {
    //     Task.belongsToMany(models.User, {
    //         through: models.UserTask,
    //         as: 'Users',
    //         foreignKey: 'taskUuid',
    //         otherKey: 'userUuid'
    //       });
    // };

    // Task.associate = (models) => {
    //     Task.belongsTo(models.Project, {foreignKey: {field: 'uuid'}, as: 'project'});
    // };
    return Task;
};
