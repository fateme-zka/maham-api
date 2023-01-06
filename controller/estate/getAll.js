const Joi = require("joi");

const body_schema = Joi.object({});
const query_schema = Joi.object({});

const handler = async function (req, res) {
  return await req.context.getEstates();
};

module.exports = { handler, body_schema, query_schema, auth: false };
