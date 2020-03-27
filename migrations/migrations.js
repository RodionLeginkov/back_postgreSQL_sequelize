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
            uuid: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING(64),
                allowNull: false,
            },
            source: {
                type: DataTypes.STRING(64),
            },
            communication: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            withdrawal_of_funds: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            owner: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            start_date: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            end_date: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            history: {
              type: DataTypes.STRING(5000),
              allowNull: false,
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

        await queryInterface.createTable('tasks', {
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
            name: {
                type: DataTypes.STRING(64),
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
            },
            status: {
                type: DataTypes.STRING(64),
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

        await queryInterface.createTable('users_projects', {
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
            rate_type: {
                field: 'rate_type',
                type: DataTypes.STRING(64),
                allowNull: false,
            },
            rate: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            role: {
                type: DataTypes.STRING(64),
            },
            load: {
                field: 'load',
                type: DataTypes.STRING(64),
                allowNull: false,
              },
        });

        await queryInterface.createTable('users_tasks', {
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
            task_uuid: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'tasks',
                    key: 'uuid',
                },
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
