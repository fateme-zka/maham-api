const error_operation = require("./error_operation");
const TrezSmsClient = require("trez-sms-client");


async function sendSms(receivers, text, context)
{
	let { username, password, number } = await context.getSmsSetting();
	const client = new TrezSmsClient(username, password);

	// todo set random group_id
	let group_id = Math.floor(Math.random() * 9 * Math.pow(10, 9)) + Math.pow(10, 9);

	try
	{
		let receipt = await client.sendMessage(number, receivers, text, group_id);
		return {
			message: "message sent successfully",
			receipt
		}
	}
	catch {
		error_operation.throwError(404, "ERROR: " + error.isHttpException, error.code, error.message);
	}
}


module.exports = {
	sendSms
};