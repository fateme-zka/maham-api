const Joi = require("joi");

const query_schema = Joi.object({});

const handler = async function (req, res) {
  return await req.context.getEstates();
};

module.exports = { handler, query_schema, auth: false };
