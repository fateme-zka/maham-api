const Joi = require("joi");

const body_schema = Joi.object({
	estate_id: Joi.number().required(),
	customer_id: Joi.number().required(),
	register_time: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).required(),
	register_date: Joi.date().required(),
	reminder_time: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).required(),
	reminder_date: Joi.date().required(),
	description: Joi.string().required(),
});

const handler = async function (req)
{
	let user_id = req.user.id;
	let { estate_id, customer_id, register_time, register_date, reminder_time, reminder_date, description } = req.body;

	return await req.context.addEstateFollowup(user_id, estate_id, customer_id, register_time, register_date, reminder_time, reminder_date, description);
};

module.exports = { handler, body_schema, auth: true, auth_consultant: true };
