const Base = require("./Base");

module.exports = (sequelize, DataTypes) =>
{
	return Base(sequelize, DataTypes, "city", {
		id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true, },
		province_id: { type: DataTypes.INTEGER, allowNull: false },
		name: { type: DataTypes.STRING, allowNull: false },
	});
};
