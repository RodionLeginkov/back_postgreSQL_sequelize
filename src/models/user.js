'use strict';
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const errors = require('../errors');


module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
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
        fullName: {
            type: DataTypes.VIRTUAL(DataTypes.STRING, [
                'firstName',
                'lastName',
            ]),
            get() {
                return `${this.get('firstName') || ''} ${this.get('lastName') ||
                    ''}`.trim();
            }},
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
            set: function (password) {
                this.setDataValue('password', User.hashPassword(password));
            },
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
            type: DataTypes.STRING(128),
        },
        current_occupation: {
            type: DataTypes.STRING(128),
        },
        role: {
            type: DataTypes.STRING(64),
        },
        total_load: {
            type: DataTypes.INTEGER
        },
        english_skill: {
            type: DataTypes.STRING(64),
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
    }, {
        tableName: 'users',
        timestamps: true,
    });


    User.associate = (models) => {
        User.belongsToMany(models.Skill, {
            through: models.UserSkill,
            as: 'Skills',
            foreignKey: 'user_uuid',
            otherKey: 'skill_uuid'
        });

        User.hasMany(models.Milestone, {
            as: 'UserMilestones',
            foreignKey: 'user_uuid',
        });
        User.hasMany(models.TasksHistory, {
            as: 'UsersTasks',
            foreignKey: 'user_uuid',
        });
        User.hasMany(models.TasksHistory, {
            as: 'TasksCreator',
            foreignKey: 'creator_uuid',
        });
    };
    /**
     * @param {string} email
     * @param {string} password
     * @return {object} user
     */
    User.authenticate = async (email, password) => {
        const user = await User.findOne({
            where: {email: email},
            attributes: [...User.publicAttributes, 'password'],
        });
        if (!user) throw errors.NotFoundError('User not found!');
        if (!user.password) throw errors.NotAllowedError('Password not set! Please contact support.');
        if (!user.isActive) throw errors.NotAllowedError('Your account has ben disabled, please contact support.');
        if (user.password !== User.hashPassword(password)) throw errors.UnauthorizedError('Invalid credentials');
        return user;
    };

    /**
     * @param {string} password
     * @return {any} hash
     */
    User.hashPassword = (password) => crypto
        .createHmac('sha512', process.env.SALT || 'salt')
        .update(password)
        .digest('hex');

    /**
     * Generate Authentication Token for user
     * @return {{type: string, expiresIn: *, accessToken: *}}
     */
    User.prototype.generateToken = async function () {
        const salt = process.env.SALT || 'salt';
        const data = {
            userId: this.uuid,
            userRole: this.userRole,
        };

        const tokenLifeTime = process.env.TOKEN_LIFE_TIME || 600000;
        return {
            type: 'Bearer',
            expiresIn: tokenLifeTime,
            accessToken: jwt.sign(data, salt, {expiresIn: tokenLifeTime}),
        };
    };

    User.publicAttributes = [
        ..._.without(_.keys(User.rawAttributes), 'createdAt', 'updatedAt', 'password'),
    ];

    return User;
};
