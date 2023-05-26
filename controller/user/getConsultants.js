const Joi = require("joi");

const query_schema = Joi.object({
	role: Joi.string().allow("").valid("searcher", "attracter", "admin"),
});

const handler = async function (req)
{
	let { role } = req.query;
	return await req.context.getConsultants(role);
};

module.exports = { handler, query_schema };
