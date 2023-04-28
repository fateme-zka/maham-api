const Joi = require("joi");

const body_schema = Joi.object({
	customer_id: Joi.number().required(),
	customer_stage_id: Joi.number().required(),
	followup_user_id: Joi.number().required(),
	time: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).required(),
	date: Joi.date().required(),
	reminder_time: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).required(),
	reminder_date: Joi.date().required(),
	description: Joi.string().required(),
});

const handler = async function (req)
{
	let user_id = req.user.id;
	let { customer_id, customer_stage_id, followup_user_id, time, date, reminder_time, reminder_date, description } = req.body;

	return await req.context.addCustomerFollowup(user_id, customer_id, customer_stage_id, followup_user_id, time, date, reminder_time, reminder_date, description);
};

module.exports = { handler, body_schema, auth: true, auth_consultant: true };
