const Joi = require("joi");

const query_schema = Joi.object({
	user_role_name: Joi.string().required(),
});

const handler = async function (req)
{
	let { user_role_name } = req.query;

	return await req.context.getUsers(user_role_name);
};

module.exports = { handler, query_schema, auth: true, auth_admin: true };
