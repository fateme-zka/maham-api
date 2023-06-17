const Joi = require("joi");

const body_schema = Joi.object({
	estate_id: Joi.number().required(),
	customer_id: Joi.number().required(),
	title: Joi.string().required(),
	address: Joi.string().required(),
	description: Joi.string().required(),
	date: Joi.date().required(),
	send_sms: Joi.boolean().required(),
});

const handler = async function (req)
{
	let user_id = req.user.id;
	let { estate_id, customer_id, title, address, description, date, send_sms } = req.body;

	return await req.context.addMeeting(user_id, estate_id, customer_id, title, address, description, date, send_sms);
};

module.exports = { handler, body_schema, auth: true, auth_consultant: true };
