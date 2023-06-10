const router = require("express").Router();

const requestHandler = require("../../middleware/requestHandler");

const postController = require("../../controller/admin/sms/sendSms");
const putController = require("../../controller/admin/sms/put");

router.post("/send", requestHandler(postController));
router.put("/", requestHandler(putController));

module.exports = router;
