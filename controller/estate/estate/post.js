const Joi = require("joi");
const Phone = require("phone");

const body_schema = Joi.object({
	estate_type_id: Joi.number().required(),
	sale_method: Joi.string().required(),
	name: Joi.string().required(),
	phone_number: Joi.string().required(),
	email: Joi.string().allow(""),
	province_id: Joi.number().positive().required(),
	city_id: Joi.number().positive().required(),
	area: Joi.string().allow(""),
	address: Joi.string().required(),
	description: Joi.string().allow(""),
	land_size_meter: Joi.number().positive().required(),
	building_size_meter: Joi.number().positive().allow(""),
	loan: Joi.boolean().allow(""),
	document_type: Joi.string().allow(""),
	// others
	building_name: Joi.string().allow(""),
	cooling_system: Joi.string().allow(""),
	heating_system: Joi.string().allow(""),
	crossing_width: Joi.number().positive().allow(""),
	length: Joi.number().positive().allow(""),
	width: Joi.number().positive().allow(""),
	distance_to_city: Joi.number().positive().allow(""),
	distance_to_sea: Joi.number().positive().allow(""),
	room_count: Joi.number().positive().allow(""),
	building_floor_count: Joi.number().positive().allow(""),
	building_unit_count: Joi.number().positive().allow(""),
	flooring_type: Joi.string().allow(""),
	cabinet_type: Joi.string().allow(""),
	windows_type: Joi.string().allow(""),
	closet_type: Joi.string().allow(""),
	inner_door_type: Joi.string().allow(""),
	entrance_door_type: Joi.string().allow(""),
	facade_type: Joi.string().allow(""),
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
	//sale
	total_price: Joi.number().positive().allow(""),
	meter_price: Joi.number().positive().allow(""),
	pawn_price: Joi.number().positive().allow(""),
	rent_price: Joi.number().positive().allow(""),
	// images
	images: Joi.array().items(Joi.string()).allow(""),
});

const handler = async function (req)
{
	let {
		estate_type_id,
		sale_method,
		name,
		phone_number,
		email,
		province_id,
		city_id,
		area,
		address,
		description,
		land_size_meter,
		building_size_meter,
		loan,
		document_type,
		building_name,
		cooling_system,
		heating_system,
		crossing_width,
		length,
		width,
		distance_to_city,
		distance_to_sea,
		room_count,
		building_floor_count,
		building_unit_count,
		flooring_type,
		cabinet_type,
		windows_type,
		closet_type,
		inner_door_type,
		entrance_door_type,
		facade_type,
		parking,
		storeroom,
		elevator,
		waterfront,
		gazebo,
		green_space,
		security_door,
		table_gas,
		kitchen_hood,
		furnished,
		shooting,
		barbecue,
		fireplace,
		automatic_door,
		central_antenna,
		terrace,
		sauna,
		jacuzzi,
		air_conditioner,
		camera,
		video_door_phone,
		pool,
		total_price,
		meter_price,
		pawn_price,
		rent_price,
		images
	} = req.body;
	let user_id = req.user.id;

	// check phone_number
	if (phone_number)
	{
		if (!Phone.phone(phone_number).isValid)
			req.throw(400, "Invalid phone number.");
	}


	let verified = false;

	// check admin
	if (req.user.admin) verified = true;

	let values = {
		estate_type_id,
		user_id,
		name,
		phone_number,
		email,
		province_id,
		city_id,
		area,
		address,
		description,
		land_size_meter,
		building_size_meter,
		loan,
		document_type,
		verified,
		sold: false,
		active: true,
		building_name,
		cooling_system,
		heating_system,
		crossing_width,
		length,
		width,
		distance_to_city,
		distance_to_sea,
		room_count,
		building_floor_count,
		building_unit_count,
		flooring_type,
		cabinet_type,
		windows_type,
		closet_type,
		inner_door_type,
		entrance_door_type,
		facade_type,
		parking,
		storeroom,
		elevator,
		waterfront,
		gazebo,
		green_space,
		security_door,
		table_gas,
		kitchen_hood,
		furnished,
		shooting,
		barbecue,
		fireplace,
		automatic_door,
		central_antenna,
		terrace,
		sauna,
		jacuzzi,
		air_conditioner,
		camera,
		video_door_phone,
		pool,
		sale_method,
		total_price,
		meter_price,
		pawn_price,
		rent_price,
	};

	return await req.context.addEstate(values, images);
};

module.exports = { handler, body_schema, auth: true };
