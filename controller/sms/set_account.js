const Joi = require("joi");

const body_schema = Joi.object({
	username: Joi.string().required(),
	password: Joi.string().required(),
	number: Joi.string().required(),
});

const handler = async function (req)
{
	let user_id = req.user.id;
	let { username, password, number } = req.body;
	let value = JSON.stringify({ username, password, number });
	return await req.context.addOrUpdateSetting("sms_panel_account", value, user_id);
};
module.exports = { handler, body_schema, auth: true, auth_admin: true };
