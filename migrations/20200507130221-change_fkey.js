'use strict';


module.exports = {
  up: async (Sequelize, DataTypes) => {
      await Sequelize.changeColumn('persons', 'project_uuid', {
        type: DataTypes.UUID,
        allowNull: true,
      });
      await Sequelize.changeColumn('tasks_history', 'user_uuid', {
        type: DataTypes.UUID,
        allowNull: true,
      }),
      await Sequelize.changeColumn('tasks_history', 'creator_uuid', {
        type: DataTypes.UUID,
        allowNull: true,
      });
    },

  down: async (Sequelize, DataTypes) => {
      await Sequelize.changeColumn('persons', 'project_uuid', {
        type: DataTypes.UUID,
        allowNull: false,
      });
      await Sequelize.changeColumn('tasks_history', 'user_uuid', {
        type: DataTypes.UUID,
        allowNull: false,
      }),
      await Sequelize.changeColumn('tasks_history', 'user_uuid', {
        type: DataTypes.UUID,
        allowNull: false,
      });
  }
};
