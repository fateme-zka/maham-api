const Joi = require("joi");
const Phone = require("phone");
const Bcrypt = require("bcrypt");

const body_schema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(6).alphanum().required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().allow(null),
  phone_number: Joi.string().max(13).required(),
  email: Joi.string().email().allow(null),
});

const handler = async function (req, res) {
  let { username, password, first_name, last_name, phone_number, email } =
    req.body;

  // check username
  let user = await req.context.getUser("username", username);
  console.log(user);
  if (user) req.throw(400, "Username already exists.");

  // check phone_number
  if (phone_number) {
    if (!Phone.phone(phone_number).isValid)
      req.throw(400, "Invalid phone number.");
    user = await req.context.getUser("phone_number", phone_number);
    if (user) req.throw(400, "Phone number already exists.");
  }

  // hash password
  password = await Bcrypt.hash(password, process.env.bcrypt_salt);

  let role = await req.context.getRole("Customer");

  return await req.context.registerUser(
    role.id,
    false,
    username,
    password,
    first_name,
    last_name,
    phone_number,
    email
  );
};

module.exports = { handler, body_schema, auth: false };
