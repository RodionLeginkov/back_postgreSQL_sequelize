'use strict';

module.exports = {
    up: async (Sequelize, DataTypes) => {
        await Sequelize.createTable('user_tokens', {
            uuid: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4,
            },
            userUuid: {
                field: 'user_uuid',
                type: DataTypes.UUID,
                references: {
                    model: 'users',
                    key: 'uuid'
                }
            },
            expiresIn: {
                field: 'expires_id',
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
        await Sequelize.dropTable('user_tokens');
    }
};
