'use strict';

module.exports = (sequelize, Sequelize) => {
    const Skill = sequelize.define('Skill', {
        uuid: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING(64),
            allowNull: false,
        },
        color: {
            type: Sequelize.STRING(64),
        },
        icon: {
            type: Sequelize.STRING(64),
        },
    }, {
        tableName: 'skills',
        timestamps: false,
    });

    return Skill;
};
