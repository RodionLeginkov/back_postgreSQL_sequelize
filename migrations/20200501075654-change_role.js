'use strict';

module.exports = {
    up: async (Sequelize, DataTypes) => {
        await Sequelize.changeColumn('milestones', 'role', {
            type: DataTypes.STRING(50),
        });
    },

    down: async (Sequelize, DataTypes) => {
        await Sequelize.changeColumn('milestones', 'role', {
            type: DataTypes.STRING(20),
        });
    }
};
