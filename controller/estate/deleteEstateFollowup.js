const Joi = require("joi");

const body_schema = Joi.object({});

const handler = async function (req)
{
	let { id } = req.params;

	return await req.context.deleteEstateFollowup(id);
};

module.exports = { handler, body_schema, auth: true, auth_consultant: true };
