const Base = require("./Base");

module.exports = (sequelize, DataTypes) =>
{
	return Base(sequelize, DataTypes, "user_role", {
		id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true, },
		name: { type: DataTypes.STRING, allowNull: false },
		position: { type: DataTypes.TINYINT, allowNull: false },
		permissions: { type: DataTypes.JSON, allowNull: true },
	});
};
