const Base = require("./Base");

module.exports = (sequelize, DataTypes) => {
  return Base(sequelize, DataTypes, "user_role", {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true, },
    position: { type: DataTypes.TINYINT, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    permissions: { type: DataTypes.JSON, allowNull: false },
  });
};
