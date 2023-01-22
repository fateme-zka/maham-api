const Joi = require("joi");

const body_schema = Joi.object({
  estate_id: Joi.number().required(),
  bookmark: Joi.boolean().required(),
});

const handler = async function (req) {
  let { estate_id, bookmark } = req.body;
  let user_id = req.user.id;
  return await req.context.bookmarkEstate(estate_id, user_id, bookmark);
};

module.exports = { handler, body_schema, auth: true };
