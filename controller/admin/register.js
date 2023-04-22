const Joi = require("joi");
const Phone = require("phone");
const Bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");

const body_schema = Joi.object({
	user_role_id: Joi.number().required(),
	username: Joi.string().required(),
	password: Joi.string().min(6).alphanum().required(),
	first_name: Joi.string().required(),
	last_name: Joi.string().allow(null),
	phone_number: Joi.string().max(13).required(),
	email: Joi.string().email().allow(null),
	image: Joi.string().allow(null),
});

const handler = async function (req)
{
	let {
		user_role_id,
		username,
		password,
		first_name,
		last_name,
		phone_number,
		email,
		image,
	} = req.body;
	// check username
	let user = await req.context.getUser("username", username);
	if (user) req.throw(400, "Username already exists.");
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
	let admin = false;
	if (user_role_id == process.env.admin_id) admin = true;
	user = await req.context.registerUser(
		user_role_id,
		admin,
		username,
		password,
		first_name,
		last_name,
		phone_number,
		email,
		image,
	);
	return { user };
};

module.exports = { handler, body_schema, auth: true, auth_admin: true };
