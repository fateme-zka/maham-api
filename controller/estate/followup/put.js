const Joi = require("joi");

const body_schema = Joi.object({
	estate_id: Joi.number().required(),
	customer_id: Joi.number().required(),
	date: Joi.date().required(),
	reminder_date: Joi.date().required(),
	description: Joi.string().required(),
});

const handler = async function (req)
{
	let { estate_id, customer_id, date, reminder_date, description } = req.body;
	let { id } = req.params;
	let user_id = req.user.id;

	let estate_followup = await req.context.getEstateFollowup(id);
	if (!req.user.admin && estate_followup.user_id != user_id)
		req.throw(403, "You have no access.");

	return await req.context.updateEstateFollowup(estate_id, customer_id, date, reminder_date, description);
};

module.exports = { handler, body_schema, auth: true, auth_consultant: true };
