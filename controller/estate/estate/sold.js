const Joi = require("joi");

const body_schema = Joi.object({
	sold: Joi.boolean().required(),
});

const handler = async function (req)
{
	let { id } = req.params;
	let { sold } = req.body;
	let user = req.user;
	let estate = await req.context.getEstate(id);

	if (!user.admin && estate.user_id !== user.id)
		req.throw(401, "User is not estate's owner.");

	return await req.context.soldEstate(id, sold);
};

module.exports = { handler, body_schema, auth: true, auth_consultant: true };
