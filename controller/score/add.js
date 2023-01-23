const Joi = require("joi");

const body_schema = Joi.object({
  estate_id: Joi.number().required(),
  star: Joi.number().min(1).max(5).required(),
});

const handler = async function (req) {
  let { estate_id, star } = req.body;
  let user_id = req.user.id;
  let score = await req.context.getModel("score", {
    where: { estate_id, user_id },
  });
  if (score) req.throw(400, "Score has been set for this estate");
  return await req.context.addScore(estate_id, user_id, star);
};

module.exports = { handler, body_schema, auth: true };
