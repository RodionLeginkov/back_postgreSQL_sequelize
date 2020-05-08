'use strict';

module.exports = (sequelize, Sequelize) => {
    const Participant = sequelize.define('Participant', {
        'uuid': {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        'person_uuid': {
          type: Sequelize.UUID,
          references: {
              model: 'persons',
              key: 'uuid',
          }
        },
        'name': {
          type: Sequelize.STRING(64),
        },
        'role': {
          type: Sequelize.STRING(50),
        },
        'createdAt': {
          type: Sequelize.DATE,
          field: 'created_at',
      },
      'updatedAt': {
          type: Sequelize.DATE,
          field: 'updated_at',
      },
  }, 
     {
        tableName: 'participants',
        timestamps: true,
    });

    Participant.associate = (models) => {
      Participant.belongsTo(models.Person, {
        as: 'Participants',
        foreignKey: 'person_uuid',
      });
    };
    return Participant;
  };
