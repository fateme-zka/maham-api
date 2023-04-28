const router = require("express").Router();

const requestHandler = require("../middleware/requestHandler");

const getCustomersController = require("../controller/customer/getAllCustomers");
const postController = require("../controller/customer/postCustomer");
const getAllStagesController = require("../controller/customer/getAllStages");
const postStageController = require("../controller/customer/postStage");

router.get("/all", requestHandler(getCustomersController));
router.post("/", requestHandler(postController));
router.get("/stage/all", requestHandler(getAllStagesController));
router.post("/stage", requestHandler(postStageController));

module.exports = router;
