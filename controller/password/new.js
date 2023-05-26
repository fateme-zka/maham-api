const Bcrypt = require('bcrypt');
const Joi = require("joi");
const { onSafeVerify } = require('../../util/otp_operation');
const PATTERN = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

const body_schema = Joi.object({
	user_id: Joi.number().required(),
	hash: Joi.string().required(),
	pass_new: Joi.string().min(6).regex(PATTERN).required()
		.messages({
			"string.pattern.base": "Please select a password with a minimum of 8 characters least one upper and lower case character and at least one number and one special character."
		}),
	pass_rep: Joi.any().equal(Joi.ref('pass_new')).required()
		.messages({ 'any.only': '"Confirm password" does not match.' })
});

const handler = async (req) =>
{
	let {
		user_id,
		hash,
		pass_new
	} = req.body;
	let user = await req.context.getUser("id", user_id);

	return await onSafeVerify(
		req,
		hash,
		process.env.f_otp_expire_time,
		process.env.f_try_max_attempt,
		user.f_otp,
		user.f_otp_time,
		user.f_try_attempt,
		async () =>
		{
			user.f_try_attempt++;
			user = await user.save();
		},
		async () =>
		{
			user.f_otp = null;
			user.f_otp_time = null;
			user.f_otp_attempt = 0;
			user.password = await Bcrypt.hash(pass_new, process.env.bcrypt_salt);
			user = await user.save();
		});
};

module.exports = { handler, body_schema }