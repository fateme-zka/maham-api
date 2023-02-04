const Joi = require("joi");

const body_schema = Joi.object({
  sender_id: Joi.number().required(),
  title: Joi.string().required(),
  text: Joi.string().required(),
});

const handler = async function (req) {
  let { sender_id, title, text } = req.body;
  let user_id = req.user.id;
  return await req.context.sendMessage(sender_id, user_id, title, text);
};

module.exports = { handler, body_schema, auth: true, auth_consultant: true };
