// const Bcrypt = require("bcrypt");


// Bcrypt.hash("1234", "$2b$10$WMnXDZ8k7RTg3AI3Nd0t5u", function(p1, p2) {
//     console.log(p1);
//     console.log(p2);
// });



const TrezSmsClient = require("trez-sms-client");
const client = new TrezSmsClient("satrika", "satrika@205");


// client.autoSendCode("09116658986", "Signiture Footer For Branding")
// 	.then((messageId) =>
// 	{
// 		console.log("Sent Message ID: " + messageId);
// 	})
// 	.catch(error => console.log(error));

// console.log(client);


client.prices()
	.then((prices) =>
	{
		console.log("Farsi: " + prices.fa + " Rials, English: " + prices.en + " Rials"); // Farsi: 129 Rials, English: 295 Rials
	})
	.catch((error) =>
	{
		console.log(error.isHttpException, error.code, error.message);
	});

