'use strict';

module.exports = (sequelize, Sequelize) => {
    const UserTask = sequelize.define('UserTask', {
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
        taskUuid: {
            field: 'task_uuid',
            type: Sequelize.UUID,
            allowNull: false,
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
        UserTask.belongsTo(models.User, {foreignKey: {field: 'uuid'}, as: 'users'});
        UserTask.belongsTo(models.Task, {foreignKey: {field: 'uuid'}, as: 'tasks'});
    };

    return UserTask;
};
