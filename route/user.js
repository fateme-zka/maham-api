const router = require("express").Router();

const requestHandler = require("../middleware/requestHandler");

const registerCustomerController = require("../controller/user/register");
const adminRegisterController = require("../controller/user/admin_register");

router.post("/register", requestHandler(registerCustomerController));
router.post("/admin_register", requestHandler(adminRegisterController));

module.exports = router;
