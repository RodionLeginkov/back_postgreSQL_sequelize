'use strict';

module.exports = (sequelize, Sequelize) => {
    const Project = sequelize.define('Project', {
        'uuid': {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        'name': {
            type: Sequelize.STRING(64),
            allowNull: false,
        },
        'withdrawal_of_funds': {
            type: Sequelize.STRING(64),
        },
        'communication': {
            type: Sequelize.STRING(64),
        },
        'type': {
            type: Sequelize.STRING(64),
        },
        'owner': {
            type: Sequelize.STRING(64),
        },
        'start_date': {
            type: Sequelize.DATE,
        },
        'end_date': {
            type: Sequelize.DATE,
        },
        'description': {
            type: Sequelize.STRING(64),
        },
        'history': {
            type: Sequelize.STRING(5000),
        },
        'source': {
            type: Sequelize.STRING(64),
        },
        // currentMilestoneUuid: {
        //     field: 'current_milestone_id',
        //     type: Sequelize.UUID,
        // },
        'createdAt': {
            type: Sequelize.DATE,
            field: 'created_at',
        },
        'updatedAt': {
            type: Sequelize.DATE,
            field: 'updated_at',
        },
    }, {
        tableName: 'projects',
        timestamps: true,
    });

    Project.associate = (models) => {
        Project.belongsToMany(models.Skill, {
            through: models.ProjectSkills,
            as: 'Skills',
            foreignKey: 'project_uuid',
            otherKey: 'skill_uuid'
          });

          Project.belongsToMany(models.User, {
            through: models.UsersProject,
            as: 'Users',
            foreignKey: 'project_uuid',
            otherKey: 'user_uuid'
          });

          Project.hasMany(models.Task, {
            as: 'Tasks',
            foreignKey: 'project_uuid',
          });
    };


    return Project;
};
