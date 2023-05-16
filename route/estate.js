const router = require("express").Router();

const requestHandler = require("../middleware/requestHandler");

// estate
const getAllEstateController = require("../controller/estate/estate/getAll");
const getEstateController = require("../controller/estate/estate/get");
const getRecentEstateController = require("../controller/estate/estate/getRecents");
const getAllTypesController = require("../controller/estate/estate/getAllTypes");
const postEstateController = require("../controller/estate/estate/post");
const activeEstateController = require("../controller/estate/estate/active");
const soldEstateController = require("../controller/estate/estate/sold");
const deleteEstateController = require("../controller/estate/estate/delete");

// followup
const getAllFollowupsController = require("../controller/estate/followup/getAllEstateFollowup");
const postFollowupController = require("../controller/estate/followup/postEstateFollowup");
const putFollowupController = require("../controller/estate/followup/putEstateFollowup");
const deleteFollowupController = require("../controller/estate/followup/deleteEstateFollowup");

router.get("/all", requestHandler(getAllEstateController));
router.get("/recent", requestHandler(getRecentEstateController));
router.get("/:id", requestHandler(getEstateController));
router.get("/type/all", requestHandler(getAllTypesController)); // should get filter query
router.post("/", requestHandler(postEstateController));
router.put("/active/:id", requestHandler(activeEstateController));
router.put("/sold/:id", requestHandler(soldEstateController));
router.delete("/:id", requestHandler(deleteEstateController));

router.get("/followup/all", requestHandler(getAllFollowupsController));
router.post("/followup", requestHandler(postFollowupController));
router.put("/followup/:id", requestHandler(putFollowupController));
router.delete("/followup/:id", requestHandler(deleteFollowupController));

module.exports = router;
