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

  // check subscription_date
  let currentDate = new Date().toJSON().slice(0, 10);
  if (currentDate >= process.env.subscription_expired_date)
    req.throw(403, "Your yearly subscription is finished please try to charge it immediately.")

  if (!user) req.throw(404, "Username does not exist.");

  password = await Bcrypt.hash(password, process.env.bcrypt_salt);
  if (user.password !== password) req.throw(400, "Invalid password.");

  const payload = {
    user_id: user.id,
    created_at: new Date()
  };
  const token = Jwt.sign(payload, process.env.jwt_key, { expiresIn: '2d' });
  return { token, user };
};

module.exports = { handler, body_schema, auth: false };
