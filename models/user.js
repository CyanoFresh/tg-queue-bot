module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    chat_id: DataTypes.BIGINT,
    name: DataTypes.STRING,
  }, {
    updatedAt: false,
  });
  User.associate = function(models) {
    User.belongsTo(models.Group);
    User.belongsToMany(models.Queue, { through: models.QueueUser });
  };
  return User;
};
