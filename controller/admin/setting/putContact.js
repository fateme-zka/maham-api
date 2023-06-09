const Joi = require("joi");
const Phone = require("phone");

const body_schema = Joi.object({
	call_number: Joi.string().required(),
	phone_number: Joi.string().required(),
	email: Joi.string().email().required(),
	address: Joi.string().required(),
});

const handler = async function (req)
{
	let { call_number, phone_number, email, address } = req.body;

	// check phone
	if (!Phone.phone(phone_number).isValid)
		req.throw(400, "Invalid phone number.");
	if (!Phone.phone(call_number).isValid) // todo check
		req.throw(400, "Invalid call number.");

	return await req.context.updateContactSetting(call_number, phone_number, email, address);
};

module.exports = { handler, body_schema, auth: true, auth_admin: true };
