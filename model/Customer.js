const Base = require("./Base");

module.exports = (sequelize, DataTypes) =>
{
	return Base(sequelize, DataTypes, "customer", {
		id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true, },
		user_id: { type: DataTypes.INTEGER, allowNull: false },
		customer_stage_id: { type: DataTypes.INTEGER, allowNull: false },
		name: { type: DataTypes.STRING, allowNull: false },
		phone_number: { type: DataTypes.STRING(13), allowNull: false },
		address: { type: DataTypes.STRING(4096), allowNull: false },
	});
};
