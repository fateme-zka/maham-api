const Joi = require("joi");
let estate_fields = require("../../data/estate_fields.json");

const query_schema = Joi.object({
	sale_or_estate: Joi.string().allow(""),
	sale_method: Joi.string().allow(""),
	estate_type: Joi.string().allow(""),
});

const handler = async function (req)
{
	let { sale_or_estate, sale_method, estate_type } = req.query;

	if (sale_or_estate)
		return estate_fields[sale_or_estate.toLowerCase()];
	if (sale_method)
		return estate_fields["sale_methods"][sale_method.toLowerCase()];
	if (estate_type)
		return estate_fields["estate_types"][estate_type.toLowerCase()];

	return estate_fields;
};

module.exports = { handler, query_schema };
