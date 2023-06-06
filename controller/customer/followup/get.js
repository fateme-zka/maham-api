const Joi = require("joi");

const query_schema = Joi.object({});

const handler = async function (req)
{
	let { id } = req.params;

	let customer_followup = await req.context.getCustomerFollowup(id);
	if (!req.user.admin && customer_followup.responsible_user_id != user_id)
		req.throw(403, "You have no access.");

	return customer_followup;
}

module.exports = { handler, query_schema, auth: true, auth_consultant: true };
