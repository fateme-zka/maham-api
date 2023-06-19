const Joi = require("joi");
const Phone = require("phone");
const email_operation = require("../../../../util/email_operation");

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

	let advertising_request = await req.context.addAdvertisingRequest(user.id, name, phone_number, call_number, ad_type, description);

	if (advertising_request)
	{
		let text = `
		«Mahama amlak new Advertisign request»
		--------------------------------------
		<Admin Info>
		name: ${user.name}
		email: ${user.email}

		<Advertising Info>
		name: ${advertising_request.name}
		phone_number: ${advertising_request.phone_number}
		call_number: ${advertising_request.call_number}
		advertising type: ${advertising_request.ad_type}
		description: ${advertising_request.description}
		created_at: ${advertising_request.createdAt}
		`;

		email_operation.send(
			process.env.requsest_receiver_email,
			"Maham Amlak Advertising Request",
			text
		);

		return {
			message: "Advertising request sent",
			advertising_request
		}
	}

};

module.exports = { handler, body_schema, auth: true, auth_admin: true };
