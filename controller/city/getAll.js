const Joi = require("joi");

const query_schema = Joi.object({});

const handler = async function (req)
{
	let { province_id } = req.params;
	return await req.context.getCities(province_id);
};

module.exports = { handler, auth: false };
