const router = require("express").Router();

const requestHandler = require("../../middleware/requestHandler");

const verifyEstateController = require("../../controller/admin/estate/verify");
const transferEstateController = require("../../controller/admin/estate/transfer");

router.put("/verify/:id", requestHandler(verifyEstateController));
router.put("/transfer/:id", requestHandler(transferEstateController));

module.exports = router;
