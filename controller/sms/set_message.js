const Joi = require("joi");

const body_schema = Joi.object({
	phone_numbers: Joi.array().items(Joi.string()).required(),
	text: Joi.string().required(),
});

const handler = async function (req)
{
	let user_id = req.user.id;
	let { phone_numbers, text } = req.body;
	// todo send messages

	phone_numbers = JSON.stringify(phone_numbers);
	await req.context.addSms(user_id, text, phone_numbers);
};

module.exports = { handler, body_schema, auth: true, auth_admin: true };
