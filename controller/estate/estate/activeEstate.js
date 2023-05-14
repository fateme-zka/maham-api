const Joi = require("joi");

const body_schema = Joi.object({
	active: Joi.boolean().required(),
});

const handler = async function (req)
{
	let { id } = req.params;
	let { active } = req.body;
	let user = req.user;
	let estate = await req.context.getEstate(id);

	if (!user.admin && estate.user_id !== user.id)
		req.throw(401, "User is not estate's owner.");

	return await req.context.activeEstate(id, active);
};

module.exports = { handler, body_schema, auth: true };
