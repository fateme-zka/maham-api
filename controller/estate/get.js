const handler = async function (req) {
  let { id } = req.params;
  return await req.context.getEstate(id);
};

module.exports = { handler, auth: false };
