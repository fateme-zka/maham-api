const Base = require("./Base");

module.exports = (sequelize, DataTypes) =>
{
	return Base(sequelize, DataTypes, "support_request", {
		id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true, },
		user_id: { type: DataTypes.INTEGER, allowNull: true },
		name: { type: DataTypes.STRING, allowNull: false },
		phone_number: { type: DataTypes.STRING(13), allowNull: false },
		call_number: { type: DataTypes.STRING(13), allowNull: false },
		title: { type: DataTypes.STRING, allowNull: false },
		description: { type: DataTypes.STRING(4096), allowNull: false },
	});
};
