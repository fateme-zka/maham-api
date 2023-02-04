const Joi = require("joi");

const query_schema = Joi.object({
  all: Joi.boolean().required(),
});

const handler = async function (req) {
  let { all } = req.query;
  let user_id = req.user.id;
  return await req.context.getMessages(all, user_id);
};

module.exports = { handler, query_schema, auth: true, auth_consultant: true };
