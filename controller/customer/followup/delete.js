const Joi = require("joi");

const body_schema = Joi.object({});

const handler = async function (req)
{
	let { id } = req.params;
	let user_id = req.user.id;

	let customer_followup = await req.context.getCustomerFollowup(id);
	if (!req.user.admin && customer_followup.responsible_user_id != user_id)
		req.throw(403, "You have no access.");


	return await req.context.deleteCustomerFollowup(id);
};

module.exports = { handler, body_schema, auth: true, auth_consultant: true };
