const Joi = require("joi");
const Phone = require("phone");
const sms_operation = require("../../util/sms_operation");
const { otpGenerator, onSafeRequest } = require("../../util/otp_operation");

const body_schema = Joi.object({
	phone_number: Joi.string().required()
});

const handler = async (req) =>
{
	let { phone_number } = req.body;

	// check phone_number
	if (phone_number)
	{
		if (!Phone.phone(phone_number).isValid)
			req.throw(400, "Invalid phone number.");
	}

	let user = await req.context.getUser("phone_number", phone_number);
	if (!user) req.throw(400, "Phone number does not exists!");

	phone_number = "0" + phone_number.slice(3);

	let response = await onSafeRequest(
		process.env.f_otp_wait_time,
		process.env.f_otp_max_attempt,
		user.f_otp_time,
		user.f_otp_attempt, async () =>
	{
		// update user
		user.f_otp = otpGenerator(4, 4);
		user.f_otp_time = new Date();
		user.f_otp_attempt += 1;
		user.f_try_attempt = 0;
		user = await user.save();

		// Send 
		let change_password_link = process.env.FRONT_BASE_URL + `/change_password?user_id=${user.id}&otp=${user.f_otp}`;
		let text = `برای تغییر رمز عبور حساب کاربری مهام املاک خود لطفا وارد لینک زیر شوید: \n${change_password_link} \nمهام املاک`;
		await sms_operation.sendSms([phone_number], text, req.context);
	});

	return { response };
};

module.exports = { handler, body_schema };