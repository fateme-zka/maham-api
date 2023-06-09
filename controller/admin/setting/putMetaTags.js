const Joi = require("joi");
const Phone = require("phone");

const body_schema = Joi.object({
	logo_url: Joi.string().required(),
	keywords: Joi.array().items(Joi.string()).required(),
	title_meta_tags: Joi.array().items(Joi.string()).required(),
	description_meta_tags: Joi.array().items(Joi.string()).required(),
});

const handler = async function (req)
{
	let { logo_url, keywords, title_meta_tags, description_meta_tags } = req.body;

	return await req.context.updateMetaTagsAndLogoSettings(logo_url, keywords, title_meta_tags, description_meta_tags);
};

module.exports = { handler, body_schema, auth: true, auth_admin: true };
