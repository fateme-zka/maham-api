const error_operation = require("./error_operation");
const TrezSmsClient = require("trez-sms-client");
const client = new TrezSmsClient(process.env.trez_username, process.env.trez_password);

function send(recipient_numbers, text, sender_number)
{
	return client.sendMessage(sender_number, recipient_numbers, text);
}

async function sendText(phone_number, text)
{
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