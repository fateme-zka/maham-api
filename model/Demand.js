const Base = require("./Base");
const { Sequelize } = require("sequelize");
const sale_methods = require("../data/sale_method.json");

module.exports = (sequelize, DataTypes) =>
{
	let methods = [];
	for (const key in sale_methods)
		methods.push(key);

	return Base(sequelize, DataTypes, "demand", {
		id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true, },
		user_id: { type: DataTypes.INTEGER, allowNull: false },
		customer_id: { type: DataTypes.INTEGER, allowNull: false },
		estate_type_id: { type: DataTypes.INTEGER, allowNull: false },
		sale_method: {
			type: Sequelize.ENUM(methods),
			allowNull: false,
		},
		province_id: { type: DataTypes.INTEGER, allowNull: true },
		city_id: { type: DataTypes.INTEGER, allowNull: true },
		min_price: { type: DataTypes.BIGINT, allowNull: true },
		max_price: { type: DataTypes.BIGINT, allowNull: true },
		min_meter: { type: DataTypes.FLOAT, allowNull: true },
		max_meter: { type: DataTypes.FLOAT, allowNull: true },
		description: { type: DataTypes.TEXT, allowNull: true },
		// option
		parking: { type: DataTypes.BOOLEAN, allowNull: true },
		storeroom: { type: DataTypes.BOOLEAN, allowNull: true },
		elevator: { type: DataTypes.BOOLEAN, allowNull: true },
		waterfront: { type: DataTypes.BOOLEAN, allowNull: true },
		gazebo: { type: DataTypes.BOOLEAN, allowNull: true },
		green_space: { type: DataTypes.BOOLEAN, allowNull: true },
		security_door: { type: DataTypes.BOOLEAN, allowNull: true },
		table_gas: { type: DataTypes.BOOLEAN, allowNull: true },
		kitchen_hood: { type: DataTypes.BOOLEAN, allowNull: true },
		furnished: { type: DataTypes.BOOLEAN, allowNull: true },
		shooting: { type: DataTypes.BOOLEAN, allowNull: true },
		barbecue: { type: DataTypes.BOOLEAN, allowNull: true },
		fireplace: { type: DataTypes.BOOLEAN, allowNull: true },
		automatic_door: { type: DataTypes.BOOLEAN, allowNull: true },
		central_antenna: { type: DataTypes.BOOLEAN, allowNull: true },
		terrace: { type: DataTypes.BOOLEAN, allowNull: true },
		sauna: { type: DataTypes.BOOLEAN, allowNull: true },
		jacuzzi: { type: DataTypes.BOOLEAN, allowNull: true },
		air_conditioner: { type: DataTypes.BOOLEAN, allowNull: true },
		camera: { type: DataTypes.BOOLEAN, allowNull: true },
		video_door_phone: { type: DataTypes.BOOLEAN, allowNull: true },
		pool: { type: DataTypes.BOOLEAN, allowNull: true },
	});
};
