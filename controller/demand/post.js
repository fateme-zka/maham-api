const Joi = require("joi");

const body_schema = Joi.object({
	customer_id: Joi.number().required(),
	estate_type_id: Joi.number().required(),
	sale_method: Joi.string().required().valid("rent", "pawn", "sell"),
	province_id: Joi.number().positive().allow(""),
	city_id: Joi.number().positive().allow(""),
	description: Joi.string().allow(""),
	min_meter: Joi.number().positive().allow(""),
	max_meter: Joi.number().positive().allow(""),
	min_price: Joi.number().positive().allow(""),
	max_price: Joi.number().positive().allow(""),
	// options
	parking: Joi.boolean().allow(""),
	storeroom: Joi.boolean().allow(""),
	elevator: Joi.boolean().allow(""),
	waterfront: Joi.boolean().allow(""),
	gazebo: Joi.boolean().allow(""),
	green_space: Joi.boolean().allow(""),
	security_door: Joi.boolean().allow(""),
	table_gas: Joi.boolean().allow(""),
	kitchen_hood: Joi.boolean().allow(""),
	furnished: Joi.boolean().allow(""),
	shooting: Joi.boolean().allow(""),
	barbecue: Joi.boolean().allow(""),
	fireplace: Joi.boolean().allow(""),
	automatic_door: Joi.boolean().allow(""),
	central_antenna: Joi.boolean().allow(""),
	terrace: Joi.boolean().allow(""),
	sauna: Joi.boolean().allow(""),
	jacuzzi: Joi.boolean().allow(""),
	air_conditioner: Joi.boolean().allow(""),
	camera: Joi.boolean().allow(""),
	video_door_phone: Joi.boolean().allow(""),
	pool: Joi.boolean().allow(""),
});

const handler = async function (req)
{
	let user_id = req.user.id;
	let { customer_id, estate_type_id, sale_method, province_id, city_id, min_price, max_price, min_meter, max_meter, description, parking, storeroom, elevator, waterfront, gazebo, green_space, security_door, table_gas, kitchen_hood, furnished, shooting, barbecue, fireplace, automatic_door, central_antenna, terrace, sauna, jacuzzi, air_conditioner, camera, video_door_phone, pool } = req.body;

	return await req.context.addDemand(user_id, customer_id, estate_type_id, sale_method, province_id, city_id, min_price, max_price, min_meter, max_meter, description, parking, storeroom, elevator, waterfront, gazebo, green_space, security_door, table_gas, kitchen_hood, furnished, shooting, barbecue, fireplace, automatic_door, central_antenna, terrace, sauna, jacuzzi, air_conditioner, camera, video_door_phone, pool);
};

module.exports = { handler, body_schema, auth: true, auth_consultant: true };
