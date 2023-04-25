const Base = require("./Base");

module.exports = (sequelize, DataTypes) =>
{
	return Base(sequelize, DataTypes, "setting", {
		id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true, },
		user_id: { type: DataTypes.INTEGER, allowNull: true },
		key: { type: DataTypes.STRING, allowNull: false },
		value: { type: DataTypes.STRING, allowNull: false },
	});
};
