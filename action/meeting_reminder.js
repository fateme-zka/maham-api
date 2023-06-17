

async function sendReminderSms(context)
{
	let meetings = await context.getUpcomingMeetingsToRemind();
	for (let i = 0;i < meetings.length;i++)
	{
		// todo send sms
	}
};

module.exports = {
	sendReminderSms
};