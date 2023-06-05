const Joi = require("joi");
let estate_fields = require("../../data/estate_fields.json");

const query_schema = Joi.object({
	estate_type: Joi.string().allow(""),
});

const handler = async function (req)
{
	let { estate_type } = req.query;

	if (estate_type)
		return estate_fields[estate_type.toLowerCase()];

	return estate_fields;
};

module.exports = { handler, query_schema };
