const handler = async function (req) {
  return await req.context.getConsultantsOrAdmins();
};

module.exports = { handler, auth: true, auth_consultant: true };
