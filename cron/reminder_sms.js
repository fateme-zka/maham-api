const cron = require('node-cron');
const Winston = require("../config/winston");
const email_operation = require("../util/email_operation");

async function start(context)
{
	cron.schedule('14 0 * * *', async () => // todo Amir set time
	{
		Winston.info("Cron was started for Reminder SMS");
		try
		{
			// todo send sms
			// await sendGameAdvertising(context);
		}
		catch (error)
		{
			Winston.error({ error });
			email_operation.sendException(error.stack);
		}
	});
};
module.exports = { start };
