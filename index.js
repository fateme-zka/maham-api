// dotenv
require("dotenv").config();

// Winston
const Winston = require("./config/winston");

// Express
const Express = require("express");
const app = Express();
app.use(Express.json());

// Cors
const cors = require("cors");
app.use(cors());

// Database
const Context = require("./Context");
const context = new Context();
context.init();

// Api Routes
app.use("/", require("./route/route"));

// Start server
const port = process.env.server_port;
app.listen(port, () => {
  Winston.info(`Server listening on port ${port}`);
});
