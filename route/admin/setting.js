const router = require("express").Router();

const requestHandler = require("../../middleware/requestHandler");

const getAllSettingsController = require("../../controller/admin/setting/getAll");
const putMetaTagsController = require("../../controller/admin/setting/putMetaTags");
const putContactController = require("../../controller/admin/setting/putContact");

router.get("/all", requestHandler(getAllSettingsController));
router.put("/meta/tag", requestHandler(putMetaTagsController));
router.put("/contact", requestHandler(putContactController));

module.exports = router;
