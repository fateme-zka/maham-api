const Joi = require("joi");

const body_schema = Joi.object({
	bookmark: Joi.boolean().required(),
});

const handler = async function (req)
{
	let { id } = req.params;
	let { bookmark } = req.body;
	let user_id = req.user.id;

	// check estate
	let estate = await req.context.getEstate(id);

	return await req.context.switchBookmarkEstate(id, user_id, bookmark);
};

module.exports = { handler, body_schema, auth: true };
