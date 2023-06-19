const Joi = require("joi");
const sms_operation = require("../../../util/sms_operation");

const body_schema = Joi.object({
	receivers: Joi.array().items(Joi.string()).required(),
	text: Joi.string().required(),
});

const handler = async function (req)
{
	let { receivers, text } = req.body;

	return await sms_operation.sendSms(receivers, text, req.context);
};

module.exports = { handler, body_schema, auth: true, auth_admin: true };