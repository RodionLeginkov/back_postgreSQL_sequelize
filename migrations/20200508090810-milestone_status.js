'use strict';

module.exports = {
  up: async (Sequelize, DataTypes) => {
      await Sequelize.addColumn('milestones', 'status', {
        type: DataTypes.STRING(20),

      });
    },

  down: async (Sequelize, DataTypes) => {
      await Sequelize.removeColumn('milestones', 'status');
  }
};
