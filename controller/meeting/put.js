const Joi = require("joi");

const body_schema = Joi.object({
	title: Joi.string().allow(""),
	description: Joi.string().allow(""),
	address: Joi.string().allow(""),
	time: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).allow(""),
	date: Joi.date().allow(""),
	send_sms: Joi.boolean().allow(""),
});

const handler = async function (req)
{
	let { id } = req.params;
	let { title, description, address, time, date, send_sms } = req.body;

	return await req.context.updateMeeting(id, title, description, address, time, date, send_sms);
};

module.exports = { handler, body_schema, auth: true, auth_consultant: true };
