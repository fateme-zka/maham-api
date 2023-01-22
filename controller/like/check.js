const Joi = require("joi");

const body_schema = Joi.object({
  estate_id: Joi.number().required(),
});

const handler = async function (req) {
  let { estate_id } = req.body;
  let user_id = req.user.id;
  return await req.context.checkLike(estate_id, user_id);
};

module.exports = { handler, body_schema, auth: true };
