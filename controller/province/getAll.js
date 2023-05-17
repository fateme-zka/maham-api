const Joi = require("joi");

const query_schema = Joi.object({});

const handler = async function (req)
{
	return await req.context.getProvinces();
};

module.exports = { handler, auth: false };
