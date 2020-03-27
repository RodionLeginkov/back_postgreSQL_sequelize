'use strict';

module.exports = (sequelize, Sequelize) => {
    const UserTask = sequelize.define('UserTask', {
        uuid: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        user_uuid: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
                model: 'users',
                key: 'uuid',
            },
        },
        task_uuid: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
                model: 'tasks',
                key: 'uuid',
            },
        },
    }, {
        tableName: 'users_tasks',
        timestamps: false,
    });

    UserTask.associate = (models) => {
        UserTask.belongsTo(models.User, {foreignKey: 'user_uuid', as: 'User'});
        UserTask.belongsTo(models.Task, {foreignKey: 'task_uuid', as: 'Task'});
    };

    return UserTask;
};
