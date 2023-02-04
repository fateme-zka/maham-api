const Base = require("./Base");

module.exports = (sequelize, DataTypes) => {
  return Base(sequelize, DataTypes, "message", {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true, },
    sender_id: { type: DataTypes.INTEGER, allowNull: false },
    receiver_id: { type: DataTypes.INTEGER, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    text: { type: DataTypes.STRING, allowNull: false },
    seen: { type: DataTypes.BOOLEAN, allowNull: false },
  });
};
