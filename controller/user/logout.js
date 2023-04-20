const Joi = require("joi");

const body_schema = Joi.object({});

const handler = async function (req)
{
	let user = req.user;
	return { message: "User is logged out", user };
};

module.exports = { handler, body_schema, auth: true };
