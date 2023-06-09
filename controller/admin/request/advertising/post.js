const Joi = require("joi");
const Phone = require("phone");

const body_schema = Joi.object({
	name: Joi.string().required(),
	phone_number: Joi.string().max(13).required(),
	call_number: Joi.string().max(13).required(),
	ad_type: Joi.string().required().valid(
		"Printed",
		"Graphic design and teaser",
		"Coaching business",
		"Sales & Marketing",
		"Campaign design",
		"SMS",
		"Email",
		"Web design",
		"Branding",
		"Content production",
		"SEO and optimization",
		"Management consultation",
	),
	description: Joi.string().required(),
});

const handler = async function (req)
{
	let { name, phone_number, call_number, ad_type, description } = req.body;
	let user = req.user;

	// check phone_number
	if (!Phone.phone(phone_number).isValid)
		req.throw(400, "Invalid phone number.");

	// check call_number
	if (!Phone.phone(call_number).isValid)
		req.throw(400, "Invalid call number."); // todo check 

	// todo send request to brand site panel by axios

	return await req.context.addAdvertisingRequest(user.id, name, phone_number, call_number, ad_type, description);
};

module.exports = { handler, body_schema, auth: true, auth_admin: true };
