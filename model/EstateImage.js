const Base = require("./Base");

module.exports = (sequelize, DataTypes) => {
  return Base(sequelize, DataTypes, "estate_image", {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true, },
    estate_id: { type: DataTypes.INTEGER, allowNull: false },
    image: { type: DataTypes.INTEGER, allowNull: false },
  });
};
