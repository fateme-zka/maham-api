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
	let user_id = req.user.id;

	return await req.context.addEstateFollowup(user_id, estate_id, customer_id, time, date, reminder_time, reminder_date, description);
};

module.exports = { handler, body_schema, auth: true, auth_consultant: true };
