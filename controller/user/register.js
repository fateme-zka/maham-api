const Joi = require("joi");
const Phone = require("phone");
const Bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");

const body_schema = Joi.object({
	email: Joi.string().email().min(4).required(),
	password: Joi.string().min(6).alphanum().required(),
	name: Joi.string().required(),
	phone_number: Joi.string().max(13).required(),
	image: Joi.string().allow(null),
	cover_image: Joi.string().allow(null),
});

const handler = async function (req)
{
	let {
		email,
		password,
		name,
		phone_number,
		image,
		cover_image,
	} = req.body;
	let user_role_id = parseInt(process.env.customer_id);
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
	user = await req.context.registerUser(
		user_role_id,
		false,
		email,
		password,
		name,
		phone_number,
		image,
		cover_image
	);
	const payload = {
		user_id: user.id,
		created_at: new Date()
	};
	const token = Jwt.sign(payload, process.env.jwt_key, { expiresIn: '2d' });
	return { token, user };
};

module.exports = { handler, body_schema, auth: false };
