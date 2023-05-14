const Joi = require("joi");

const body_schema = Joi.object({
	user_id: Joi.number().allow(""),
	register_time: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).allow(""),
	register_date: Joi.date().allow(""),
	reminder_time: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).allow(""),
	reminder_date: Joi.date().allow(""),
	description: Joi.string().allow(""),
});

const handler = async function (req)
{
	let { id } = req.params;
	let { user_id, register_time, register_date, reminder_time, reminder_date, description } = req.body;

	return await req.context.updateEstateFollowup(id, user_id, register_time, register_date, reminder_time, reminder_date, description);
};

module.exports = { handler, body_schema, auth: true, auth_consultant: true };
