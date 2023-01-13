const Base = require("./Base");
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  return Base(sequelize, DataTypes, "estate_score", {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true, },
    estate_id: { type: DataTypes.INTEGER, allowNull: false },
    score: {
        type: Sequelize.ENUM(1, 2, 3, 4, 5),
        allowNull: false,
    },
  });
};
