const Joi = require("joi");

const query_schema = Joi.object({});

const handler = async function (req) {
  let { id } = req.params;
  return await req.context.verifyEstate(id);
};

module.exports = { handler, query_schema, auth: true, auth_admin: true };
