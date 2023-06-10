const router = require("express").Router();

const requestHandler = require("../../middleware/requestHandler");

const getAllSettingsController = require("../../controller/admin/setting/getAll");
const addLogoController = require("../../controller/admin/setting/addLogo");
const putMetaTagsController = require("../../controller/admin/setting/putMetaTags");
const putContactController = require("../../controller/admin/setting/putContact");
const putSiteController = require("../../controller/admin/setting/putSite");
const removeLogoController = require("../../controller/admin/setting/deleteLogo");

router.get("/all", requestHandler(getAllSettingsController));
router.post("/upload/logo", requestHandler(addLogoController));
router.put("/meta/tag", requestHandler(putMetaTagsController));
router.put("/contact", requestHandler(putContactController));
router.put("/site", requestHandler(putSiteController));
router.delete("/logo", requestHandler(removeLogoController));

module.exports = router;
