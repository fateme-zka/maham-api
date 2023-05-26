const Joi = require("joi");
const Phone = require("phone");

const body_schema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().required().email(),
	phone_number: Joi.string().required(),
	image: Joi.string().allow(""),
});

const handler = async function (req)
{
	let { email, name, phone_number, image } = req.body;

	let user = req.user;

	// check email
	let check_user = await req.context.getUser("email", email);
	if (check_user && user.id !== check_user.id)
		req.throw(400, "Email is already taken.");

	// check phone_number
	if (!Phone.phone(phone_number).isValid)
		req.throw(400, "Invalid phone number.");

	check_user = await req.context.getUser("phone_number", phone_number);
	if (check_user && user.id !== check_user.id)
		req.throw(400, "Phone number is already taken.");

	return await req.context.updateUser(user.id, {
		email,
		name,
		phone_number,
		image,
	});
};

module.exports = { handler, body_schema, auth: true };
