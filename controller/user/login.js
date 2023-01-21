const Joi = require("joi");
const Bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");

const body_schema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(6).alphanum().required(),
});

const handler = async function (req) {
  let { username, password } = req.body;
  let user = await req.context.getUser("username", username);

  if (!user) req.throw(404, "Username does not exist.");

  password = await Bcrypt.hash(password, process.env.bcrypt_salt);
  if (user.password !== password) req.throw(400, "Invalid password.");

  let session = await req.context.createSession(
    user.id,
    user.role_id,
    user.admin
  );

  const payload = {
    user_id: user.id,
    role_id: user.role_id,
    admin: user.admin,
    session_id: session.id,
  };
  const token = Jwt.sign(payload, process.env.jwt_key);
  return { token, user };
};

module.exports = { handler, body_schema, auth: false };
