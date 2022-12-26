// dotenv
require("dotenv").config();

// Express
const Express = require("express");
const app = Express();

// Cors
const cors = require("cors");
app.use(cors());

// Start server
const port = process.env.server_port;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
