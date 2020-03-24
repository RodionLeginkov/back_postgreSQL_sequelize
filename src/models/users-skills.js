'use strict';

module.exports = (sequelize, Sequelize) => {
    const UserSkill = sequelize.define('UserSkill', {
        userUuid: {
            field: 'user_uuid',
            type: Sequelize.UUID,
            primaryKey: true,
            references: {
                model: 'users',
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
        tableName: 'users_skills',
        timestamps: false,
    });

    UserSkill.associate = (models) => {
        UserSkill.belongsTo(models.User, {foreignKey: {field: 'uuid'}, as: 'user'});
        UserSkill.belongsTo(models.Skill, {foreignKey: {field: 'uuid'}, as: 'skill'});
    };

    return UserSkill;
};
