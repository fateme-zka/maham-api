const router = require("express").Router();

const requestHandler = require("../middleware/requestHandler");

const setAccountController = require("../controller/sms/set_account");
const setMessageController = require("../controller/sms/set_message");

router.post("/account", requestHandler(setAccountController));
router.post("/message", requestHandler(setMessageController));

module.exports = router;
