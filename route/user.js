const router = require("express").Router();

const requestHandler = require("../middleware/requestHandler");

const getController = require("../controller/user/get");
const registerController = require("../controller/user/register");
const loginController = require("../controller/user/login");
const updateController = require("../controller/user/update");

router.get("/info", requestHandler(getController));
router.post("/register", requestHandler(registerController));
router.post("/login", requestHandler(loginController));
router.put("/update/:id", requestHandler(updateController));

module.exports = router;
