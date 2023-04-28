const Joi = require("joi");
const Phone = require("phone");

const body_schema = Joi.object({
	name: Joi.string().required(),
	phone_number: Joi.string().max(13).required(),
	call_number: Joi.string().max(13).required(),
	type: Joi.string().required(),
	description: Joi.string().required(),
});

const handler = async function (req)
{
	let user_id = req.user.id;
	let { name, phone_number, call_number, type, description } = req.body;

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

	// todo send advertising request by sms

	return await req.context.addAdvertisingRequests(user_id, name, phone_number, call_number, type, description);
};

module.exports = { handler, body_schema, auth: true, auth_admin: true };
