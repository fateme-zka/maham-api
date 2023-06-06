const Joi = require("joi");
const Phone = require("phone");

const body_schema = Joi.object({
	customer_stage_id: Joi.number().required(), // todo check
	responsible_user_id: Joi.number().required(),
	time: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).required()
		.messages({
			"string.pattern.base": "Please enter correct time."
		}),
	date: Joi.date().required(),
	reminder_time: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).required()
		.messages({
			"string.pattern.base": "Please enter correct time."
		}),
	reminder_date: Joi.date().required(),
	description: Joi.string().required(),
});

const handler = async function (req)
{
	let { customer_stage_id, responsible_user_id, time, date, reminder_time, reminder_date, description } = req.body;
	let { id } = req.params;
	let user_id = req.user.id;

	let customer_followup = await req.context.getCustomerFollowup(id);
	if (!req.user.admin && customer_followup.responsible_user_id != user_id)
		req.throw(403, "You have no access.");

	return await req.context.updateCustomerFollowup(id, customer_stage_id, responsible_user_id, time, date, reminder_time, reminder_date, description);
};

module.exports = { handler, body_schema, auth: true, auth_consultant: true };
