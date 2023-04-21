const Base = require("./Base");
const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) =>
{
	return Base(sequelize, DataTypes, "advertising_request", {
		id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true, },
		name: { type: DataTypes.STRING, allowNull: false },
		phone_number: { type: DataTypes.STRING(13), allowNull: false },
		call_number: { type: DataTypes.STRING(13), allowNull: false },
		type: {
			type: Sequelize.ENUM(
				"Printed",
				"Graphic design and teaser",
				"Coaching business",
				"Sales & Marketing",
				"Campaign design",
				"SMS",
				"Email",
				"Web design",
				"Branding",
				"Content production",
				"SEO and optimization",
				"Management consultation",
			),
			allowNull: true,
		},
		description: { type: DataTypes.STRING(4096), allowNull: false },
	});
};
