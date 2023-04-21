const Base = require("./Base");

module.exports = (sequelize, DataTypes) =>
{
	return Base(sequelize, DataTypes, "contact_us", {
		id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true, },
		estate_id: { type: DataTypes.INTEGER, allowNull: true },
		name: { type: DataTypes.STRING, allowNull: false },
		email: { type: DataTypes.STRING, allowNull: false },
		phone_number: { type: DataTypes.STRING(13), allowNull: true },
		title: { type: DataTypes.STRING, allowNull: true },
		text: { type: DataTypes.STRING(4096), allowNull: false },
	});
};
