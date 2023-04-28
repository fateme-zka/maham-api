const Joi = require("joi");
const Phone = require("phone");

const body_schema = Joi.object({
	name: Joi.string().required(),
	phone_number: Joi.string().max(13).required(),
	call_number: Joi.string().max(13).required(),
	title: Joi.string().required(),
	description: Joi.string().required(),
});

const handler = async function (req)
{
	let user_id = req.user.id;
	let { name, phone_number, call_number, title, description } = req.body;

	// check phone_number
	if (phone_number)
	{
		if (!Phone.phone(phone_number).isValid)
			req.throw(400, "Invalid phone number.");
	}

	// check call_number
	if (call_number)
	{
		if (!Phone.phone(call_number).isValid)
			req.throw(400, "Invalid call number.");
	}

	// todo send support request by sms

	return await req.context.addSupportRequests(user_id, name, phone_number, call_number, title, description);
};

module.exports = { handler, body_schema, auth: true, auth_admin: true };
