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
        'description': {
            type: Sequelize.STRING(255),
        },
        'customer': {
            type: Sequelize.STRING(64),
        },
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

          Project.hasMany(models.Milestones, {
            as: 'Projects_Milestones',
            foreignKey: 'project_uuid',
          });
    };


    return Project;
};
