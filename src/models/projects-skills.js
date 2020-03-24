'use strict';

module.exports = (sequelize, Sequelize) => {
    const ProjectSkills = sequelize.define('ProjectSkills', {
        userUuid: {
            field: 'project_uuid',
            type: Sequelize.UUID,
            primaryKey: true,
            references: {
                model: 'projects',
                key: 'uuid',
            },
        },
        skillUuid: {
            field: 'skill_uuid',
            type: Sequelize.UUID,
            primaryKey: true,
            references: {
                model: 'skills',
                key: 'uuid',
            },
        },
        level: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
    }, {
        tableName: 'projects_skills',
        timestamps: false,
    });

    ProjectSkills.associate = (models) => {
      ProjectSkills.belongsTo(models.Project, {foreignKey: {field: 'uuid'}, as: 'project'});
      ProjectSkills.belongsTo(models.Skill, {foreignKey: {field: 'uuid'}, as: 'skill'});
    };

    return ProjectSkills;
};
