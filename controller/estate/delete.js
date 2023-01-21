const handler = async function (req) {
  let { id } = req.params;
  let user = req.user;
  let estate = await req.context.getEstate(id);
  if (!user.admin && estate.user_id !== user.id)
    req.throw(401, "User is not estate's owner.");
  return await req.context.deleteEstate(id);
};

module.exports = { handler, auth: true };
