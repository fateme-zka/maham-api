const router = require("express").Router();

const requestHandler = require("../../middleware/requestHandler");

const putController = require("../../controller/admin/sms/put");

router.put("/", requestHandler(putController));

module.exports = router;
