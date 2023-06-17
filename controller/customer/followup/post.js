const Joi = require("joi");

const body_schema = Joi.object({
	customer_id: Joi.number().required(),
	customer_stage_id: Joi.number().required(),
	responsible_user_id: Joi.number().required(),
	date: Joi.date().required(),
	reminder_date: Joi.date().required(),
	description: Joi.string().required(),
});

const handler = async function (req)
{
	let { customer_id, customer_stage_id, responsible_user_id, date, reminder_date, description } = req.body;
	let user_id = req.user.id;

	return await req.context.addCustomerFollowup(user_id, customer_id, customer_stage_id, responsible_user_id, date, reminder_date, description);
};

module.exports = { handler, body_schema, auth: true, auth_consultant: true };
