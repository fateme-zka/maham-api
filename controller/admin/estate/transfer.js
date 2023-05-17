const Joi = require("joi");

const body_schema = Joi.object({
	receiver_id: Joi.number().required(),
});

const handler = async function (req)
{
	let { id } = req.params;
	let { receiver_id } = req.body;

	return await req.context.transferEstate(id, receiver_id);
};

module.exports = { handler, body_schema, auth: true, auth_admin: true };
