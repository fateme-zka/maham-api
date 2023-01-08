const jwt = require("jsonwebtoken");

function set_auth_header(req, payload, jwt_key) {
  const accessToken = jwt.sign(payload, jwt_key);
  req.headers["authorization"] = "Bearer " + accessToken;
  return accessToken;
}

async function auth_token_verifier(req, jwt_key) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) req.throw(403, "No token!");
  let payload = jwt.verify(token, jwt_key);
  if (!payload) req.throw(403, "Token is not valid.");
  return payload;
}

function remove_header(req, header_key) {
  req.headers[header_key] = null;
}

module.exports = { set_auth_header, auth_token_verifier, remove_header };
