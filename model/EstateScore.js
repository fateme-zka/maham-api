const Base = require("./Base");
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) =>
{
	return Base(sequelize, DataTypes, "estate_score", {
		id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true, },
		estate_id: { type: DataTypes.INTEGER, allowNull: false },
		user_id: { type: DataTypes.INTEGER, allowNull: false },
		score: { type: DataTypes.INTEGER, allowNull: false }, // 0 to 5
	});
};
