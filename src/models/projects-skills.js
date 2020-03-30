'use strict';

module.exports = (sequelize, Sequelize) => {
    const ProjectSkills = sequelize.define('ProjectSkills', {
        uuid: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        project_uuid: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
                model: 'projects',
                key: 'uuid',
            },
        },
        skill_uuid: {
            type: Sequelize.UUID,
            allowNull: false,
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
      ProjectSkills.belongsTo(models.Project, {foreignKey: {field: 'project_uuid'}, as: 'Project'});
      ProjectSkills.belongsTo(models.Skill, {foreignKey: {field: 'skill_uuid'}, as: 'Skill'});
    };

    return ProjectSkills;
};
