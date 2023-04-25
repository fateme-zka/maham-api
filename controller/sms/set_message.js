const Joi = require("joi");
const sms_operation = require("../../util/sms_operation");

const body_schema = Joi.object({
	phone_numbers: Joi.array().items(Joi.string()).required(),
	text: Joi.string().required(),
});

const handler = async function (req)
{
	let user_id = req.user.id;
	let { phone_numbers, text } = req.body;

	let sms_account = await req.context.getSettingByKey("sms_panel_account");
	sms_account = JSON.parse(sms_account.value);

	// todo send messages
	return await sms_operation.send(
		phone_numbers,
		text,
		sms_account.username,
		sms_account.password,
		sms_account.number
	);

	// todo save sent messages
	// phone_numbers = JSON.stringify(phone_numbers);
	// await req.context.addSms(user_id, text, phone_numbers);
};

module.exports = { handler, body_schema, auth: true, auth_admin: true };
