const Joi = require("joi");

const query_schema = Joi.object({});

const handler = async function (req)
{
	return await req.context.getConsultantsOrAdmins();
};

module.exports = { handler, query_schema, auth: true, auth_consultant: true };
