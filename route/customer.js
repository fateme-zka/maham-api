const router = require("express").Router();

const requestHandler = require("../middleware/requestHandler");

const getAllStagesController = require("../controller/customer/getAllStages");

router.get("/stage/all", requestHandler(getAllStagesController));

module.exports = router;
