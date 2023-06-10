const Joi = require("joi");

const body_schema = Joi.object({
	username: Joi.string().required(),
	password: Joi.string().required(),
	number: Joi.string().required(),
});

const handler = async function (req)
{
	let { username, password, number } = req.body;

	return await req.context.updateSmsSetting(username, password, number);
};

module.exports = { handler, body_schema, auth: true, auth_admin: true };