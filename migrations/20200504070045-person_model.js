'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
      await queryInterface.createTable('persons', {
          'uuid': {
              type: DataTypes.UUID,
              defaultValue: DataTypes.UUIDV4,
              primaryKey: true,
          },
          'project_uuid': {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'projects',
                key: 'uuid',
            }
          },
          'name': {
            type: DataTypes.STRING(64),
          },
          'description': {
            type: DataTypes.TEXT,
          },
          'start_date': {
            type: DataTypes.DATE,
            field: 'start_date',
        },
        'end_date': {
            type: DataTypes.DATE,
            field: 'end_date',
        },
        'createdAt': {
          type: DataTypes.DATE,
          field: 'created_at',
      },
      'updatedAt': {
          type: DataTypes.DATE,
          field: 'updated_at',
      },
  }, ),
  await queryInterface.addColumn('milestones', 'person_uuid', {
    type: DataTypes.UUID,
    references: {
        model: 'persons',
        key: 'uuid',
    }
  });
  },

  down: async (queryInterface, DataTypes) => {
      await queryInterface.dropTable('persons');
  }
};
