module.exports = (sequelize, DataTypes) => {
  const Queue = sequelize.define('Queue', {
    name: DataTypes.STRING,
  }, {
    updatedAt: false,
  });
  Queue.associate = function(models) {
    Queue.belongsTo(models.Group);
    Queue.belongsToMany(models.User, { through: models.QueueUser });
  };
  return Queue;
};
