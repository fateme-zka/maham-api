const Joi = require("joi");

const query_schema = Joi.object({});

const handler = async function (req)
{
	let count_all_users = await req.context.countAllUsers();
	let count_estates = await req.context.countEstates();

	return { count_all_users, count_estates };
};

module.exports = { handler, auth: false };
