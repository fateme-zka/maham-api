const Joi = require('joi');
const Path = require('path');

const body_schema = Joi.object({});

const handler = async (req, res) =>
{
	let { image } = req.files;
	let { table } = req.params;

	let md5 = image.md5;
	let ext = Path.extname(image.name);
	let path = `/static/upload/${table}/image/${md5}${ext}`;
	image.mv(__dirname + '/../../static' + path);

	return process.env.BACKEND_BASE_URL + "/" + path;
}

module.exports = { handler, body_schema };