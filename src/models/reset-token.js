module.exports = function (sequelize, Sequelize) {
  const ResetToken = sequelize.define('ResetToken', {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    userUuid: {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: 'users',
        key: 'uuid'
      }
    },
    expiresIn: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    token: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
  }, {
    tableName: 'reset_tokens',
    timestamps: false,
  });

  ResetToken.associate = (models) => {
    ResetToken.belongsTo(models.User, {
      foreignKey: 'userUuid',
    });
  };

  return ResetToken;
};
