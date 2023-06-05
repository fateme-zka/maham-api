const Joi = require("joi");

const query_schema = Joi.object({});

const handler = async function (req, res)
{
	let { id } = req.params;

	let current_user_id = null;
	if (req.user)
	{
		current_user_id = req.user.id;
	}

	return await req.context.getEstate(id, current_user_id);
};

module.exports = { handler, query_schema, auth: true, auth_optional: true };
