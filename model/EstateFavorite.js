const Base = require("./Base");

module.exports = (sequelize, DataTypes) =>
{
	return Base(sequelize, DataTypes, "estate_favorite", {
		id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true, },
		user_id: { type: DataTypes.INTEGER, allowNull: false },
		estate_id: { type: DataTypes.INTEGER, allowNull: false },
	});
};
