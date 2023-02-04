const router = require("express").Router();

const requestHandler = require("../middleware/requestHandler");

const getController = require("../controller/user/get");
const listController = require("../controller/user/getUsers");
const registerController = require("../controller/user/register");
const loginController = require("../controller/user/login");
const logoutController = require("../controller/user/logout");
const updateController = require("../controller/user/update");

router.get("/:id", requestHandler(getController));
router.get("/list", requestHandler(listController));
router.post("/register", requestHandler(registerController));
router.post("/login", requestHandler(loginController));
router.post("/logout", requestHandler(logoutController));
router.put("/update/:id", requestHandler(updateController));

module.exports = router;
