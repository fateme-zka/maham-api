const Joi = require("joi");
const Phone = require("phone");

const body_schema = Joi.object({
  username: Joi.string().min(4).allow(""),
  first_name: Joi.string().allow(""),
  last_name: Joi.string().allow(""),
  phone_number: Joi.string().allow(""),
  email: Joi.string().allow(""),
  image: Joi.string().allow(""),
  cover_image: Joi.string().allow(""),
});

const handler = async function (req) {
  let { id } = req.params;
  if (req.user.id != id && !req.user.admin) req.throw(400, "No access!");
  let user = await req.context.getUser("id", id);
  let {
    username,
    first_name,
    last_name,
    phone_number,
    email,
    image,
    cover_image,
  } = req.body;
  // check username
  if (username) {
    let check_user = await req.context.getUser("username", username);
    if (check_user && user.id !== check_user.id)
      req.throw(400, "Username is already taken.");
  }
  // check phone_number
  if (phone_number) {
    if (!Phone.phone(phone_number).isValid)
      req.throw(400, "Invalid phone number.");
    check_user = await req.context.getUser("phone_number", phone_number);
    if (check_user && user.id !== check_user.id)
      req.throw(400, "Phone number is already taken.");
  }
  return await req.context.updateUser(id, {
    username,
    first_name,
    last_name,
    phone_number,
    email,
    image,
    cover_image,
  });
};

module.exports = { handler, body_schema, auth: true };
