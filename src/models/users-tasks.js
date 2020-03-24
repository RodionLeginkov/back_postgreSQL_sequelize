'use strict';

module.exports = (sequelize, Sequelize) => {
    const UserTask = sequelize.define('UserTask', {
        userUuid: {
            field: 'user_uuid',
            type: Sequelize.UUID,
            primaryKey: true,
            references: {
                model: 'users',
                key: 'uuid',
            },
        },
        taskUuid: {
            field: 'task_uuid',
            type: Sequelize.UUID,
            primaryKey: true,
            references: {
                model: 'tasks',
                key: 'uuid',
            },
        },
    }, {
        tableName: 'user_tasks',
        timestamps: true,
    });

    UserTask.associate = (models) => {
        UserTask.belongsTo(models.User, {foreignKey: {field: 'uuid'}, as: 'user'});
        UserTask.belongsTo(models.Task, {foreignKey: {field: 'uuid'}, as: 'task'});
    };

    return UserTask;
};
