const router = require("express").Router();

const requestHandler = require("../../middleware/requestHandler");

const getAllSettingsController = require("../../controller/admin/setting/getAll");
const putMetaTagsController = require("../../controller/admin/setting/putMetaTags");

router.get("/all", requestHandler(getAllSettingsController));
router.put("/meta/tag", requestHandler(putMetaTagsController));

module.exports = router;
