module.exports = function (sequelize, Sequelize) {
  const UserToken = sequelize.define('UserToken', {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    userUuid: {
      field: 'user_uuid',
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: 'users',
        key: 'uuid'
      }
    },
    expiresIn: {
      field: 'expires_id',
      type: Sequelize.DATE,
      allowNull: false,
    },
    token: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
  }, {
    tableName: 'user_tokens',
    timestamps: false,
  });

  UserToken.associate = (models) => {
    UserToken.belongsTo(models.User, {
      foreignKey: 'userUuid',
    });
  };

  return UserToken;
};
