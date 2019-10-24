module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    chat_id: DataTypes.BIGINT,
    name: DataTypes.STRING,
    hash: DataTypes.STRING
  }, {});
  Group.associate = function(models) {
    // associations can be defined here
  };
  return Group;
};
