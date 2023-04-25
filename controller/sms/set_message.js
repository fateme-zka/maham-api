const Joi = require("joi");

const body_schema = Joi.object({
	numbers: Joi.array().items(Joi.string()).required(),
	text: Joi.string().required(),
});

const handler = async function (req)
{
	let { numbers, text } = req.body;
	// todo
};

module.exports = { handler, body_schema, auth: true, auth_admin: true };
