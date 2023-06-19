const Joi = require("joi");
const Phone = require("phone");
const email_operation = require("../../../../util/email_operation");

const body_schema = Joi.object({
	name: Joi.string().required(),
	phone_number: Joi.string().max(13).required(),
	call_number: Joi.string().max(13).required(),
	title: Joi.string().required(),
	description: Joi.string().required(),
});

const handler = async function (req)
{
	let { name, phone_number, call_number, title, description } = req.body;
	let user = req.user;

	// check phone_number
	if (!Phone.phone(phone_number).isValid)
		req.throw(400, "Invalid phone number.");

	// check call_number
	if (!Phone.phone(call_number).isValid)
		req.throw(400, "Invalid call number."); // todo check 


	let support_request = await req.context.addSupportRequest(user.id, name, phone_number, call_number, title, description);

	if (support_request)
	{
		let text = `
		«Mahama amlak new Support request»
		--------------------------------------
		<Admin Info>
		name: ${user.name}
		email: ${user.email}

		<Support Info>
		name: ${support_request.name}
		phone_number: ${support_request.phone_number}
		call_number: ${support_request.call_number}
		title: ${support_request.title}
		description: ${support_request.description}
		created_at: ${support_request.createdAt}
		`;

		email_operation.send(
			process.env.requsest_receiver_email,
			"Maham Amlak Support Request",
			text
		);

		return {
			message: "Support request sent",
			support_request
		}
	}
};

module.exports = { handler, body_schema, auth: true, auth_admin: true };
