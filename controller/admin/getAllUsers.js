const Joi = require("joi");

const query_schema = Joi.object({
	user_role: Joi.string().required(),
});

const handler = async function (req)
{
	let { user_role } = req.query;

	return await req.context.getUsers(user_role);
};

module.exports = { handler, query_schema, auth: true, auth_admin: true };
