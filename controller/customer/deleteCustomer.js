const Joi = require("joi");

const body_schema = Joi.object({});

const handler = async function (req)
{
	let { id } = req.params;
	let deleted_customer = await req.context.deleteCustomer(id);
	return { deleted_customer };
};

module.exports = { handler, body_schema, auth: true, auth_consultant: true };
