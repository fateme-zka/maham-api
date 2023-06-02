const router = require("express").Router();

const requestHandler = require("../middleware/requestHandler");

const getAllStagesController = require("../controller/customer/getAllStages");
const postCustomerController = require("../controller/customer/postCustomer");
const postStageController = require("../controller/customer/postStage");

router.get("/stage/all", requestHandler(getAllStagesController));
router.post("/", requestHandler(postCustomerController));
router.post("/stage", requestHandler(postStageController));

module.exports = router;
