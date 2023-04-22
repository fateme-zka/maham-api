const Joi = require("joi");

const query_schema = Joi.object({
	estate_id: Joi.number().allow(""),
	limit: Joi.number().allow(""),
});

const handler = async function (req)
{
	let { estate_id, limit } = req.query;
	estate_id = parseInt(estate_id);
	limit = parseInt(limit);
	return await req.context.getContactUses(limit, estate_id);
};

module.exports = { handler, query_schema, auth: true, auth_admin: true };
