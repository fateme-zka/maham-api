const Joi = require("joi");

const body_schema = Joi.object({
	score: Joi.number().required().valid(0, 1, 2, 3, 4, 5),
});

const handler = async function (req)
{
	let { id } = req.params;
	let { score } = req.body;
	let user_id = req.user.id;

	return await req.context.addScoreEstate(id, user_id, score);
};

module.exports = { handler, body_schema, auth: true };
