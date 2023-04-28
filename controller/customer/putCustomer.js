const Joi = require("joi");

const body_schema = Joi.object({
	customer_stage_id: Joi.number().allow(""),
	name: Joi.string().allow(""),
	phone_number: Joi.string().max(13).allow(""),
	address: Joi.string().allow(""),
});

const handler = async function (req)
{
	let { id } = req.params;
	let { customer_stage_id, name, phone_number, address } = req.body;

	// check phone_number
	if (phone_number)
	{
		if (!Phone.phone(phone_number).isValid)
			req.throw(400, "Invalid phone number.");
	}

	return await req.context.updateCustomer(id, customer_stage_id, name, phone_number, address);
};

module.exports = { handler, body_schema, auth: true, auth_consultant: true };
