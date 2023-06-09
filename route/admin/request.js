const router = require("express").Router();

const requestHandler = require("../../middleware/requestHandler");

const getAllSupportsController = require("../../controller/admin/request/support/getAll");
const getAllAdvertisingsController = require("../../controller/admin/request/advertising/getAll");
const postSupportController = require("../../controller/admin/request/support/post");
const postAdvertisingController = require("../../controller/admin/request/advertising/post");

router.get("/support/all", requestHandler(getAllSupportsController));
router.get("/advertising/all", requestHandler(getAllAdvertisingsController));
router.post("/support", requestHandler(postSupportController));
router.post("/advertising", requestHandler(postAdvertisingController));

module.exports = router;
