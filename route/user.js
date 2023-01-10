const router = require("express").Router();

const requestHandler = require("../middleware/requestHandler");

const registerCustomerController = require("../controller/user/register");
const adminRegisterController = require("../controller/user/admin_register");
const loginController = require("../controller/user/login");
const logoutController = require("../controller/user/logout");
const getController = require("../controller/user/get");

router.post("/register", requestHandler(registerCustomerController));
router.post("/admin_register", requestHandler(adminRegisterController));
router.post("/login", requestHandler(loginController));
router.post("/logout", requestHandler(logoutController));
router.get("/:id", requestHandler(getController));

module.exports = router;
