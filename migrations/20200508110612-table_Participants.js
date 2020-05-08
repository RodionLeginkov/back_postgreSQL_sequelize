'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
      await queryInterface.createTable('participants', {
          'uuid': {
              type: DataTypes.UUID,
              defaultValue: DataTypes.UUIDV4,
              primaryKey: true,
          },
          'person_uuid': {
            type: DataTypes.UUID,
            references: {
                model: 'persons',
                key: 'uuid',
            }
          },
          'role': {
            type: DataTypes.STRING(50),
          },
          'name': {
            type: DataTypes.STRING(64),
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
      await queryInterface.dropTable('participants');
  }
};

