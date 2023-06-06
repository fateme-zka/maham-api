const Joi = require("joi");

const query_schema = Joi.object({
	customer_id: Joi.number().allow(""),
});

const handler = async function (req)
{
	let { customer_id } = req.query;
	let user_id = req.user.id;
	if (req.user.admin)
		user_id = null;

	return await req.context.getAllCustomerFollowups(user_id, customer_id);
}

module.exports = { handler, query_schema, auth: true, auth_consultant: true };
