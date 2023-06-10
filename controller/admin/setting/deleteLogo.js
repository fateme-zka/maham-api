const Joi = require('joi');
const fs = require('fs');

const query_schema = Joi.object({
	path: Joi.string().required(),
});

const handler = async (req, res) =>
{
	let { path } = req.query;

	path = path.replace(process.env.BACKEND_BASE_URL, "");
	const directoryPath = __dirname + '/../../../static' + path;

	fs.unlink(directoryPath, (err) =>
	{
		if (err)
			req.throw(500, err);
	});
	return { message: "Logo removed successfully" }
}

module.exports = { handler, query_schema, auth: true, auth_admin: true };