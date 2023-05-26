const Joi = require("joi");

const body_schema = Joi.object({
	receiver_id: Joi.number().required(),
});

const handler = async function (req)
{
	let { id } = req.params;
	let { receiver_id } = req.body;

	let consultants = await req.context.getConsultants();
	var consultant_ids = consultants.map(function (c) { return c.id; });
	if (!consultant_ids.includes(receiver_id))
		req.throw(400, "You can only assign this estate to another consultant or admin");

	return await req.context.transferEstate(id, receiver_id);
};

module.exports = { handler, body_schema, auth: true, auth_admin: true };
