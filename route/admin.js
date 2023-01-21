const router = require("express").Router();

const requestHandler = require("../middleware/requestHandler");

const verifyController = require("../controller/admin/verifyEstate");
const registerController = require("../controller/admin/register");

router.get("/estate/verify/:id", requestHandler(verifyController));
router.post("/user/register", requestHandler(registerController));

module.exports = router;
