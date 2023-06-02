const Joi = require("joi");

const query_schema = Joi.object({
	page: Joi.number().required(),
	page_size: Joi.number().required(),
	// filters
	estate_type_id: Joi.number().allow(""),
	sale_method: Joi.string().allow("").valid("rent", "pawn", "sell"),
	city_id: Joi.number().allow(""),
	total_min_price: Joi.number().allow(""),
	total_max_price: Joi.number().allow(""),
	meter_min_price: Joi.number().allow(""),
	meter_max_price: Joi.number().allow(""),
	pawn_min_price: Joi.number().allow(""),
	pawn_max_price: Joi.number().allow(""),
	rent_min_price: Joi.number().allow(""),
	rent_max_price: Joi.number().allow(""),
});

const handler = async function (req, res)
{
	let {
		page,
		page_size,
		estate_type_id,
		sale_method,
		city_id,
		total_min_price,
		total_max_price,
		meter_min_price,
		meter_max_price,
		pawn_min_price,
		pawn_max_price,
		rent_min_price,
		rent_max_price,
	} = req.query;

	let current_user_id = null;
	if (req.user)
	{
		current_user_id = req.user.id;
	}

	return await req.context.getEstates(
		null,
		page,
		page_size,
		estate_type_id,
		sale_method,
		city_id,
		total_min_price,
		total_max_price,
		meter_min_price,
		meter_max_price,
		pawn_min_price,
		pawn_max_price,
		rent_min_price,
		rent_max_price,
		current_user_id
	);
};

module.exports = { handler, query_schema, auth: true, auth_optional: true };
