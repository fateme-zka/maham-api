const Joi = require("joi");
const Phone = require("phone");
const Bcrypt = require("bcrypt");
const PATTERN = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

const body_schema = Joi.object({
	user_role_name: Joi.string().required(),
	name: Joi.string().required(),
	phone_number: Joi.string().max(13).required(),
	email: Joi.string().email().min(4).required(),
	password: Joi.string().regex(PATTERN).required()
		.messages({
			"string.pattern.base": "Please select a password with a minimum of 8 characters least one upper and lower case character and at least one number and one special character."
		}),
	image: Joi.string().allow(""),
});

const handler = async function (req)
{
	let { user_role_name, name, phone_number, email, password, image } = req.body;
	let user_role = await req.context.getUserRole(user_role_name);

	// check email
	let user = await req.context.getUser("email", email);
	if (user) req.throw(400, "Username (email) already exists.");

	// check phone_number
	if (phone_number)
	{
		if (!Phone.phone(phone_number).isValid)
			req.throw(400, "Invalid phone number.");
		user = await req.context.getUser("phone_number", phone_number);
		if (user) req.throw(400, "Phone number already exists.");
	}

	// hash password
	password = await Bcrypt.hash(password, process.env.bcrypt_salt);
	user = await req.context.registerUser(user_role.id, false, email, password, name, phone_number, image);
	return user;
};

module.exports = { handler, body_schema, auth: true, auth_admin: true };
