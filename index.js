// dotenv
require("dotenv").config();

// Winston
const Winston = require("./config/winston");

// Error capture
const Uncaught = require('uncaught');
const email_operation = require("./util/email_operation");
Uncaught.start();
Uncaught.addListener((err) =>
{
	Winston.error("Uncaught error.", err);
	email_operation.sendException(err);
});

// Express
const Express = require("express");
const app = Express();
app.use(Express.json());

// Cors
const cors = require('cors');
const corsOptions = {
	exposedHeaders: '*',
};
app.use(cors(corsOptions));

// file upload middleware
const fileUpload = require('express-fileupload');

// static 
app.use(Express.static('static'));



// Use the express-fileupload middleware
app.use(fileUpload());


// Database
const Context = require("./Context");
const context = new Context();
context.init();

// Api Routes
app.use("/", require("./route/route"));

// Start server
const port = process.env.server_port;
app.listen(port, () =>
{
	Winston.info(`Server listening on port ${port}`);
});
