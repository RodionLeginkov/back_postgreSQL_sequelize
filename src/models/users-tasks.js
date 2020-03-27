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
        tableName: 'user_tasks',
        timestamps: true,
    });

    UserTask.associate = (models) => {
        UserTask.belongsTo(models.User, {foreignKey: 'userUuid', as: 'users'});
        UserTask.belongsTo(models.Task, {foreignKey: 'taskUuid', as: 'tasks'});
    };

    return UserTask;
};
