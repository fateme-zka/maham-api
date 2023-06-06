const Joi = require("joi");
const Phone = require("phone");

const body_schema = Joi.object({
	customer_stage_id: Joi.number().required(),
	name: Joi.string().required(),
	family: Joi.string().required(),
	phone_number: Joi.string().max(13).required(),
	address: Joi.string().required(),
});

const handler = async function (req)
{
	let user_id = req.user.id;
	let { customer_stage_id, name, family, phone_number, address } = req.body;

	// check phone_number
	if (!Phone.phone(phone_number).isValid)
		req.throw(400, "Invalid phone number.");
	let customer = await req.context.database.models.customer.findOne({ where: { phone_number } });
	if (customer)
		req.throw(400, "Customer with this phone number already exists.");

	return await req.context.addCustomer(user_id, customer_stage_id, name, family, phone_number, address);
};

module.exports = { handler, body_schema, auth: true, auth_consultant: true };
