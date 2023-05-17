const Joi = require("joi");

const body_schema = Joi.object({});

const handler = async function (req)
{
	let { id } = req.params;
	let estate = await req.context.database.models.estate.findOne({ where: { id } });

	let user_id = estate.user_id;
	let user_position = await req.context.getUserPosition(user_id);

	// todo check
	if (user_position == process.env.consumer_role_position || user_position == process.env.attracter_role_position)
		user_id = req.user.id;

	return await req.context.verifyEstate(id, user_id);
};

module.exports = { handler, auth: true, auth_admin: true };
