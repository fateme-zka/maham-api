const handler = async function (req) {
  let user = req.user;
  await req.context.deleteSession(req.session.id);
  return { message: "User is logged out", user };
};

module.exports = { handler, auth: true };
