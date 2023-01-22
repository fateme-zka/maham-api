const handler = async function (req) {
  let user_id = req.user.id;
  return await req.context.getBookmarkedEstates(user_id);
};

module.exports = { handler, auth: true };
