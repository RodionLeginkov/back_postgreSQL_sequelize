'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
      await queryInterface.createTable('tasks_history', {
          'uuid': {
              type: DataTypes.UUID,
              defaultValue: DataTypes.UUIDV4,
              primaryKey: true,
          },
          'user_uuid': {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'users',
                key: 'uuid',
            }
          },
          'creator_uuid': {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'users',
                key: 'uuid',
            }
          },
          'text': {
            type: DataTypes.STRING(5000),
        },
        'createdAt': {
          type: DataTypes.DATE,
          field: 'created_at',
      },
      'updatedAt': {
          type: DataTypes.DATE,
          field: 'updated_at',
      },
  }, );
  },

  down: async (queryInterface, DataTypes) => {
      await queryInterface.dropTable('tasks_history');
  }
};
