const Joi = require("joi");
const { remove_header } = require("../../util/header_processor");

const body_schema = Joi.object({});

const handler = async function (req) {
  let user = await req.getUser();
  remove_header(req, "authorization");
  await req.context.deleteSession(req.session.session_id);
  return {
    message: "User is logged out",
    user,
  };
};

module.exports = { handler, body_schema, auth: true };
