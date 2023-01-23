const handler = async function (req) {
  let { estate_id } = req.params;
  return await req.context.countScores(estate_id);
};

module.exports = { handler, auth: false };
