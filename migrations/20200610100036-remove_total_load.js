'use strict';

module.exports = {
  up: async (Sequelize, DataTypes) => {
    await Sequelize.removeColumn('users', 'total_load');
    },

  down: async (Sequelize, DataTypes) => {
      await Sequelize.addColumn('users', 'total_load', {
        type: DataTypes.INTEGER,

      });
  }
};
