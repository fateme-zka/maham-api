const Base = require("./Base");

module.exports = (sequelize, DataTypes) =>
{
	return Base(sequelize, DataTypes, "sms", {
		id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true, },
		user_id: { type: DataTypes.INTEGER, allowNull: true },
		text: { type: DataTypes.STRING, allowNull: false },
		phone_numbers: { type: DataTypes.STRING, allowNull: false },
	});
};
