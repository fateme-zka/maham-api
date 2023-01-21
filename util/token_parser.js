const Jwt = require("jsonwebtoken");

async function token_parser(req, jwt_key) {
  let token = req.headers["auth-jwt"];
  if (!token) req.throw(403, "No Token.");

  // decode
  let decoded;
  try {
    decoded = Jwt.verify(token, jwt_key);
  } catch (err) {
    req.throw(403, "Bad Token.");
  }

  let session = await req.context.database.models.session.findOne({
    where: { id: decoded.session_id },
  });
  if (!session) req.throw(403, "Expired Token.");
  return session;
}

module.exports = { token_parser };
