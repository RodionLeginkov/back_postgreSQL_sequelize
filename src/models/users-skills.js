'use strict';

module.exports = (sequelize, Sequelize) => {
    const UserSkill = sequelize.define('UserSkill', {
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
        tableName: 'users_skills',
        timestamps: false,
    });

    // UserSkill.associate = (models) => {
    //     UserSkill.belongsTo(models.User, {foreignKey: {field: 'uuid'}, as: 'users'});
    //     UserSkill.belongsTo(models.Skill, {foreignKey: {field: 'uuid'}, as: 'skills'});
    // };

    UserSkill.associate = (models) => {
        UserSkill.belongsTo(models.User, {foreignKey: 'user_uuid', as: 'User'});
        UserSkill.belongsTo(models.Skill, {foreignKey: 'skill_uuid', as: 'Skill'});
    };

    return UserSkill;
};
