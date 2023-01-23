const handler = async function (req) {
  let { id } = req.params;
  return await req.context.deleteComment(id);
};

module.exports = { handler, auth: true, auth_admin: true };
