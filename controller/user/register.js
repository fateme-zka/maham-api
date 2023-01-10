const Joi = require("joi");
const Phone = require("phone");
const Bcrypt = require("bcrypt");
const { set_auth_header } = require("../../util/header_processor");

const body_schema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(6).alphanum().required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().allow(null),
  phone_number: Joi.string().max(13).required(),
  email: Joi.string().email().allow(null),
});

const handler = async function (req) {
  let { username, password, first_name, last_name, phone_number, email } =
    req.body;
  let role_id = parseInt(process.env.customer_id);
  // check username
  let user = await req.context.getUser("username", username);
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
  user = await req.context.registerUser(
    role_id,
    false,
    username,
    password,
    first_name,
    last_name,
    phone_number,
    email
  );
  let session = await req.context.createSession(user.id, role_id, false);
  const payload = {
    user_id: user.id,
    role_id,
    admin: false,
    session_id: session.id,
  };
  let accessToken = set_auth_header(req, payload, process.env.jwt_key);
  return { accessToken, user };
};

module.exports = { handler, body_schema, auth: false };
