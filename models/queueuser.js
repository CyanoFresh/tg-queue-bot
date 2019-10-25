module.exports = (sequelize, DataTypes) => {
  const QueueUser = sequelize.define('QueueUser', {
    done: DataTypes.BOOLEAN
  }, {
    timestamps: false,
  });
  QueueUser.associate = function(models) {
    QueueUser.belongsTo(models.User);
    QueueUser.belongsTo(models.Queue);
  };
  return QueueUser;
};
