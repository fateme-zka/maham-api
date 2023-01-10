const Joi = require("joi");

const body_schema = Joi.object({});

const handler = async function (req) {
  let { id } = req.params;
  return await req.context.getUser("id", id);
};

module.exports = { handler, body_schema, auth: false };
