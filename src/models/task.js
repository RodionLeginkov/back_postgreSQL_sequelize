'use strict';

module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define('Task', {
        uuid: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        milestoneUuid: {
            field: 'milestone_uuid',
            type: Sequelize.UUID,
            allowNull: false,
            references: {
                model: 'milestones',
                key: 'uuid',
            },
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
        timestamps: true,
    });

    Task.associate = (models) => {
        Task.belongsTo(models.Project, {foreignKey: {field: 'uuid'}, as: 'project'});
    };
    return Task;
};
