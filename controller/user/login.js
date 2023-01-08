const Joi = require("joi");
const Bcrypt = require("bcrypt");
const { set_auth_header } = require("../../util/header_processor");

const body_schema = Joi.object({
  username: Joi.string().min(4).required(),
  password: Joi.string().min(6).alphanum().required(),
});

const handler = async function (req) {
  let { username, password } = req.body;
  let user = await req.context.getUser("username", username);

  if (!user) req.throw(404, "Username does not exist.");

  if (!(await Bcrypt.compare(password, user.password)))
    req.throw(400, "Invalid password.");

  let session = await req.context.createSession(
    user.id,
    user.role_id,
    user.admin
  );

  // JWT
  const payload = {
    user_id: user.id,
    role_id: user.role_id,
    admin: user.admin,
    session_id: session.id,
  };
  let accessToken = set_auth_header(req, payload, process.env.jwt_key);

  return { user, accessToken };
};

module.exports = { handler, body_schema, auth: false };
