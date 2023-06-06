const Joi = require("joi");

const body_schema = Joi.object({
	name: Joi.string().required(),
});

const handler = async function (req)
{
	let { name } = req.body;

	return await req.context.addCustomerStage(name);
};

module.exports = { handler, body_schema, auth: true, auth_admin: true };
