const TrezSmsClient = require("trez-sms-client");

function send(recipient_numbers, text, sender_username, sender_password, sender_number)
{
	const client = new TrezSmsClient(sender_username, sender_password);
	return client.sendMessage(sender_number, recipient_numbers, text);
}

module.exports = {
	send
};