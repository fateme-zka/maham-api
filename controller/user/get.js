const Joi = require("joi");

const query_schema = Joi.object({});

const handler = async function (req) {
  let { id } = req.params;
  return await req.context.getUser("id", id);
};

module.exports = { handler, query_schema, auth: false };
