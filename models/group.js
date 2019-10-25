module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    chat_id: DataTypes.BIGINT,
    name: DataTypes.STRING,
    hash: DataTypes.STRING
  }, {
    updatedAt: false,
  });
  Group.associate = function(models) {
    Group.hasMany(models.User);
    Group.hasMany(models.Queue);
  };
  return Group;
};
