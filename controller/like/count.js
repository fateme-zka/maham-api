const Joi = require("joi");

const body_schema = Joi.object({
  estate_id: Joi.number().required(),
});

const handler = async function (req) {
  let { estate_id } = req.body;
  let count = await req.context.countLikes(estate_id);
  return { count };
};

module.exports = { handler, body_schema, auth: true };
