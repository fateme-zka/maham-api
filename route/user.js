const router = require("express").Router();

const requestHandler = require("../middleware/requestHandler");

const registerCustomerController = require("../controller/user/register_customer");

router.post("/register_customer", requestHandler(registerCustomerController));

module.exports = router;
