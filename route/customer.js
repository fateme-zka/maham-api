const router = require("express").Router();

const requestHandler = require("../middleware/requestHandler");

const getAllStagesController = require("../controller/customer/getAllStages");
const postStageController = require("../controller/customer/postStage");

router.get("/stage/all", requestHandler(getAllStagesController));
router.post("/stage", requestHandler(postStageController));

module.exports = router;
