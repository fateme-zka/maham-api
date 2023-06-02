const router = require("express").Router();

const requestHandler = require("../middleware/requestHandler");

const getConsultantsController = require("../controller/user/getConsultants");
const getCurrentController = require("../controller/user/getCurrent");
const getController = require("../controller/user/get");
const registerController = require("../controller/user/register");
const loginController = require("../controller/user/login");
const putController = require("../controller/user/put");

router.get("/consultant/all", requestHandler(getConsultantsController));
router.get("/current", requestHandler(getCurrentController));
router.get("/:id", requestHandler(getController));
router.post("/register", requestHandler(registerController));
router.post("/login", requestHandler(loginController));
router.put("/update", requestHandler(putController));

module.exports = router;
