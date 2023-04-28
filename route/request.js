const router = require("express").Router();

const requestHandler = require("../middleware/requestHandler");

const getAllAdvertisingsController = require("../controller/request/getAllAdvertisings");
const postAdvertisingController = require("../controller/request/postAdvertising");
const getAllSupportsController = require("../controller/request/getAllSupports");
const postSupportController = require("../controller/request/postSupport");

// advertising
router.get("/advertising/all", requestHandler(getAllAdvertisingsController));
router.post("/advertising/", requestHandler(postAdvertisingController));
// support
router.get("/support/all", requestHandler(getAllSupportsController));
router.post("/support", requestHandler(postSupportController));

module.exports = router;
