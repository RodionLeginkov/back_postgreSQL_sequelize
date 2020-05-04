'use strict';

module.exports = (sequelize, Sequelize) => {
    const Person = sequelize.define('Person', {
        'uuid': {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        'project_uuid': {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
              model: 'projects',
              key: 'uuid',
          }
        },
        'name': {
          type: Sequelize.STRING(64),
        },
        'description': {
          type: Sequelize.TEXT,
        },
        'start_date': {
          type: Sequelize.DATE,
          field: 'start_date',
      },
      'end_date': {
          type: Sequelize.DATE,
          field: 'end_date',
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
        tableName: 'persons',
        timestamps: true,
    });

    Person.associate = (models) => {
      Person.belongsTo(models.Project, {
        as: 'Projects',
        foreignKey: 'project_uuid',
      });
      Person.hasMany(models.Milestones, {
        as: 'Milestone',
        foreignKey: 'person_uuid',
      });
    };
    return Person;
  };
