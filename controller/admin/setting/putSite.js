const Joi = require("joi");

const body_schema = Joi.object({
	main_page_first_title: Joi.string().required(),
	main_page_second_title: Joi.string().required(),
	main_page_description: Joi.string().required(),
	about_us: Joi.string().required(),
	services: Joi.array().items(Joi.object()).required(),
	why_choose_us: Joi.array().items(Joi.object()).required(),
	performances: Joi.array().items(Joi.object()).required(),
});

const handler = async function (req)
{
	let {
		main_page_first_title, main_page_second_title, main_page_description,
		services, why_choose_us, performances, about_us } = req.body;

	if (services.length == 0)
		req.throw(400, "Services can not be empty.");
	if (why_choose_us.length == 0)
		req.throw(400, "Why choose us can not be empty.");
	if (performances.length == 0)
		req.throw(400, "Performances can not be empty.");

	return await req.context.updateSiteSetting(main_page_first_title, main_page_second_title, main_page_description, services, why_choose_us, performances, about_us);
};

module.exports = { handler, body_schema, auth: true, auth_admin: true };