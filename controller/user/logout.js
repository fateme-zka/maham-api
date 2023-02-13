const handler = async function (req) {
  let user = req.user;
  return { message: "User is logged out", user };
};

module.exports = { handler, auth: true };
