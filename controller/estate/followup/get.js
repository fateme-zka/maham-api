const Joi = require("joi");

const query_schema = Joi.object({});

const handler = async function (req)
{
	let { id } = req.params;

	let estate_followup = await req.context.getEstateFollowup(id);
	if (!req.user.admin && estate_followup.user_id != user_id)
		req.throw(403, "You have no access.");

	return estate_followup;
}

module.exports = { handler, query_schema, auth: true, auth_consultant: true };
