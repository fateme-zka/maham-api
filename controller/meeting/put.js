const Joi = require("joi");

const body_schema = Joi.object({
	title: Joi.string().required(),
	address: Joi.string().required(),
	description: Joi.string().required(),
	time: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).required(),
	date: Joi.date().required(),
	send_sms: Joi.boolean().required(),
});

const handler = async function (req)
{
	let { id } = req.params;
	let { title, address, description, time, date, send_sms } = req.body;

	return await req.context.updateMeeting(id, title, address, description, time, date, send_sms);
};

module.exports = { handler, body_schema, auth: true, auth_consultant: true };
