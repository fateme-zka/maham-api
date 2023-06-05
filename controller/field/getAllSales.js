const Joi = require("joi");
let sale_fields = require("../../data/sale_fields.json");

const query_schema = Joi.object({
	sale_method: Joi.string().allow(""),
});

const handler = async function (req)
{
	let { sale_method } = req.query;

	if (sale_method)
		return sale_fields[sale_method.toLowerCase()];

	return sale_fields;
};

module.exports = { handler, query_schema };
