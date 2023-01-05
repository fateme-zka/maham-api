const Joi = require("joi");
const Context = require("../../Context");

const body_schema = Joi.object({});
const query_schema = Joi.object({});

const handler = async function (req, res) {
  const context = new Context();
  let result = await context.getAllEstates();
  res.send(result);
};

module.exports = { handler, body_schema, query_schema, auth: false };
