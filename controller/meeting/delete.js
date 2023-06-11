const Joi = require("joi");

const body_schema = Joi.object({});

const handler = async function (req)
{
	let { id } = req.params;
	let user_id = req.user.id;

	if (req.user.admin)
		user_id = null;

	return await req.context.deleteMeeting(id, user_id);
};

module.exports = { handler, body_schema, auth: true, auth_consultant: true };
