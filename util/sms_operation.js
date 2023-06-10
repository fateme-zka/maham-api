const error_operation = require("./error_operation");
const TrezSmsClient = require("trez-sms-client");


async function send(recipient_numbers, text, sender_number, context)
{
	let { username, password, number } = await context.getSmsSetting();
	const client = new TrezSmsClient(username, password);
	return client.sendMessage(sender_number, recipient_numbers, text);
}

async function sendText(phone_number, text, context)
{
	let { username, password, number } = await context.getSmsSetting();
	const client = new TrezSmsClient(username, password);
	try
	{
		return await client.manualSendCode(phone_number, text);
	}
	catch {
		error_operation.throwError(404, "Sms did not send.");
	}
}

module.exports = {
	send,
	sendText
};