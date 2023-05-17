const Joi = require("joi");

const body_schema = Joi.object({
	estate_id: Joi.number().allow(""),
	name: Joi.string().required(),
	email: Joi.string().required(),
	phone_number: Joi.string().allow(""),
	title: Joi.string().allow(""),
	text: Joi.string().required(),
});

const handler = async function (req)
{
	let { estate_id, name, email, phone_number, title, text } = req.body;
	if (req.user)
	{
		email = req.user.email;
		phone_number = req.user.phone_number;
	}
	return await req.context.addContactUs(name, email, phone_number, title, text, estate_id);
};

module.exports = { handler, body_schema, auth: true, auth_optional: true };
