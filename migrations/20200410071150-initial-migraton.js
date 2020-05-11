'use strict';

module.exports = {
    up: async (queryInterface, DataTypes) => {
        await queryInterface.createTable('users', {
            uuid: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            firstName: {
                field: 'first_name',
                type: DataTypes.STRING(64),
                allowNull: false,
            },
            middleName: {
                field: 'middle_name',
                type: DataTypes.STRING(64),
            },
            lastName: {
                field: 'last_name',
                type: DataTypes.STRING(64),
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING(64),
                unique: true,
            },
            isActive: {
                field: 'is_active',
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
            password: {
                type: DataTypes.STRING(512),
                allowNull: false,
            },
            project_ready: {
                type: DataTypes.INTEGER,
            },
            current_task: {
                type: DataTypes.STRING(256),
            },
            phone1: {
                type: DataTypes.STRING(64),
            },
            phone2: {
                type: DataTypes.STRING(64),
            },
            avatar: {
                type: DataTypes.STRING(64),
            },
            role: {
                type: DataTypes.STRING(64),
            },
            current_occupation: {
              type: DataTypes.STRING,
              allowNull: true,
            },
            hiredAt: {
                type: DataTypes.DATE,
                field: 'hired_at',
            },
            firedAt: {
                type: DataTypes.DATE,
                field: 'fired_at',
            },
            createdAt: {
                type: DataTypes.DATE,
                field: 'created_at',
            },
            updatedAt: {
                type: DataTypes.DATE,
                field: 'updated_at',
            },
        });

        await queryInterface.createTable('skills', {
            uuid: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING(64),
                allowNull: false,
            },
            color: {
                type: DataTypes.STRING(64),
            },
            icon: {
                type: DataTypes.STRING(64),
            },
        });

        await queryInterface.createTable('projects', {
            'uuid': {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            'name': {
                type: DataTypes.STRING(64),
                allowNull: false,
            },
            'description': {
              type: DataTypes.STRING,
              allowNull: false,
            },
            'customer': {
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
        });        
       
        await queryInterface.createTable('users_skills', {
            uuid: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            user_uuid: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'uuid',
                },
            },
            skill_uuid: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'skills',
                    key: 'uuid',
                },
            },
            level: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
        });
        await queryInterface.createTable('projects_skills', {
            uuid: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            project_uuid: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'projects',
                    key: 'uuid',
                },
            },
            skill_uuid: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'skills',
                    key: 'uuid',
                },
            },
            level: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
        });
         
        await queryInterface.createTable('milestones', {
            uuid: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            user_uuid: { 
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'uuid',
                }
            },
            project_uuid: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'projects',
                    key: 'uuid',
                },
            },
            role: {
                type: DataTypes.STRING(20),
            },
            rate: {
                type: DataTypes.INTEGER,
            },
            unit: {
                type: DataTypes.STRING(15),
            },
            load: {
                type: DataTypes.INTEGER,
            },
            start_date: {
                type: DataTypes.DATE,
                field: 'start_date',
            },
            end_date: {
                type: DataTypes.DATE,
                field: 'end_date',
            },
        });
    },

    down: async (queryInterface, DataTypes) => {
        await queryInterface.dropTable('milestones_skills');
        await queryInterface.dropTable('users_skills');
        await queryInterface.dropTable('users_tasks');
        await queryInterface.dropTable('users_milestones');
        await queryInterface.dropTable('tasks');
        await queryInterface.dropTable('milestones');
        await queryInterface.dropTable('projects');
        await queryInterface.dropTable('skills');
        await queryInterface.dropTable('users');
    }
};
