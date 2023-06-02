const Joi = require("joi");

const query_schema = Joi.object({
});

const handler = async function (req, res)
{
	let { id } = req.params;
	return await req.context.getEstate(id);
};

module.exports = { handler, query_schema };
