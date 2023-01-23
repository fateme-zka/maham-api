const Joi = require("joi");

const body_schema = Joi.object({
  estate_id: Joi.number().required(),
  text: Joi.string().required(),
});

const handler = async function (req) {
  let { estate_id, text } = req.body;
  let user_id = req.user.id;
  return await req.context.addComment(estate_id, user_id, text);
};

module.exports = { handler, body_schema, auth: true };
