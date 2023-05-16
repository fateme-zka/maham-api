const Joi = require("joi");

const query_schema = Joi.object({
	limit: Joi.number().required(),
});

const handler = async function (req, res)
{
	let { limit } = req.query;
	limit = parseInt(limit);

	return await req.context.getRecentEstates(limit);
};

module.exports = { handler, query_schema, auth: false };
