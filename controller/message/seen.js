const handler = async function (req) {
  let { id } = req.params;
  let user_id = req.user.id;
  return await req.context.seenMessage(id, user_id);
};

module.exports = { handler, auth: true, auth_consultant: true };
