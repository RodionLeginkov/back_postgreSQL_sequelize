'use strict';

module.exports = {
    up: async (Sequelize, DataTypes) => {
        await Sequelize.createTable('reset_tokens', {
            uuid: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4,
            },
            userUuid: {
                type: DataTypes.UUID,
                references: {
                    model: 'users',
                    key: 'uuid'
                }
            },
            expiresIn: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            token: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
        });
    },

    down: async (Sequelize, DataTypes) => {
        await Sequelize.dropTable('reset_tokens');
    }
};
