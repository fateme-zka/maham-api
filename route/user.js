const router = require("express").Router();

const requestHandler = require("../middleware/requestHandler");

const registerController = require("../controller/user/register");
const loginController = require("../controller/user/login");
const logoutController = require("../controller/user/logout");
const getController = require("../controller/user/get");

router.post("/register", requestHandler(registerController));
router.post("/login", requestHandler(loginController));
router.post("/logout", requestHandler(logoutController));
router.get("/:id", requestHandler(getController));

module.exports = router;
