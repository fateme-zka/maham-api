const Base = require("./Base");

module.exports = (sequelize, DataTypes) =>
{
	return Base(sequelize, DataTypes, "meeting", {
		id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true, },
		user_id: { type: DataTypes.INTEGER, allowNull: false },
		estate_id: { type: DataTypes.INTEGER, allowNull: false },
		customer_id: { type: DataTypes.INTEGER, allowNull: false },
		title: { type: DataTypes.STRING, allowNull: false },
		description: { type: DataTypes.STRING(4096), allowNull: false },
		address: { type: DataTypes.STRING(4096), allowNull: false },
		time: { type: DataTypes.TIME, allowNull: false },
		date: { type: DataTypes.DATE, allowNull: false },
		send_sms: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
	});
};
