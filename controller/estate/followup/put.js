const Joi = require("joi");

const body_schema = Joi.object({
	estate_id: Joi.number().required(),
	customer_id: Joi.number().required(),
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
	let { estate_id, customer_id, time, date, reminder_time, reminder_date, description } = req.body;
	let { id } = req.params;
	let user_id = req.user.id;

	let estate_followup = await req.context.getEstateFollowup(id);
	if (!req.user.admin && estate_followup.user_id != user_id)
		req.throw(403, "You have no access.");

	return await req.context.updateEstateFollowup(estate_id, customer_id, time, date, reminder_time, reminder_date, description);
};

module.exports = { handler, body_schema, auth: true, auth_consultant: true };
