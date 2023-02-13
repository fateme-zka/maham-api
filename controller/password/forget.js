// const fsPromises = require('fs').promises;
// const Joi = require("joi");
// const { email_operation } = require("namira-nodejs");
// const { otpGenerator, onSafeRequest } = require("../../util/otp_operation");
// const HTML_PATH = './data/forget_password_confirmation.html';

// const body_schema = Joi.object({
//     email: Joi.string().required().email()
// });

// const handler = async (req) => {
//     let { email } = req.body;
//     let user = await req.context.database.models.user.findOne({ where: { email } });
//     if (!user)
//         req.throw(404, 'Email does not exist.');

//     return await onSafeRequest(
//         process.env.f_otp_wait_time, 
//         process.env.f_otp_max_attempt,
//         user.f_otp_time, 
//         user.f_otp_attempt, async () => {
//             // update user
//             user.f_otp = otpGenerator(18, 4);
//             user.f_otp_time = new Date();
//             user.f_otp_attempt += 1;
//             user.f_try_attempt = 0;
//             user = await user.save();
//             // Send 
//             let html = (await fsPromises.readFile(HTML_PATH))
//                 .toString()
//                 .replace("{{user_id}}", user.id)
//                 .replace("{{otp}}", user.f_otp);
//             email_operation.send(
//                 email,
//                 `Forget password`,
//                 "",
//                 html
//             );
//         }
//     );
// };

// module.exports = { handler, body_schema };