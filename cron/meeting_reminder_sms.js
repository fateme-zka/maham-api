const cron = require('node-cron');
const Winston = require("../config/winston");
const { email_operation } = require("../util/email_operation");
const meeting_reminder = require("../action/meeting_reminder");

async function start(context)
{
	cron.schedule('5 0 * * *', async () => // todo check
	{
		Winston.info("Cron was started for meeting-Reminder");
		try
		{
			await meeting_reminder.sendReminderSms(context);
		}
		catch (error)
		{
			Winston.error({ error });
			email_operation.sendException(error);
		}
	});
};
module.exports = { start };