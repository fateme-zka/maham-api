const Joi = require("joi");

const body_schema = Joi.object({
  estate_id: Joi.number().required(),
  like: Joi.boolean().required(),
});

const handler = async function (req) {
  let { estate_id, like } = req.body;
  let user_id = req.user.id;
  return await req.context.likeEstate(estate_id, user_id, like);
};

module.exports = { handler, body_schema, auth: true };
