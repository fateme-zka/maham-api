const Joi = require("joi");

const body_schema = Joi.object({
	receivers: Joi.array().items(Joi.object()).required(),
	text: Joi.string().required(),
});

const handler = async function (req)
{
	let { receivers, text } = req.body;

	// todo send receivers this text
};

module.exports = { handler, body_schema, auth: true, auth_admin: true };