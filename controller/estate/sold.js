const Joi = require("joi");

const query_schema = Joi.object({
  sold: Joi.boolean().required(),
});

const handler = async function (req) {
  let { id } = req.params;
  let user = req.user;
  let estate = await req.context.getEstate(id);
  if (!user.admin && estate.user_id !== user.id)
    req.throw(401, "User is not estate's owner.");
  let { sold } = req.query;
  return await req.context.switchStatusEstate(id, null, sold);
};

module.exports = { handler, query_schema, auth: true };
