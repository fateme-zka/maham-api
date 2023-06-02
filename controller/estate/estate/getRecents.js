const Joi = require("joi");

const query_schema = Joi.object({
	limit: Joi.number().required(),
});

const handler = async function (req, res)
{
	let { limit } = req.query;
	limit = parseInt(limit);

	let current_user_id = null;
	if (req.user)
	{
		current_user_id = req.user.id;
	}

	return await req.context.getRecentEstates(limit, current_user_id);
};

module.exports = { handler, query_schema, auth: true, auth_optional: true };
