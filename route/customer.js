const router = require("express").Router();

const requestHandler = require("../middleware/requestHandler");

const getCustomersController = require("../controller/customer/getAllCustomers");
const postController = require("../controller/customer/postCustomer");
const putController = require("../controller/customer/putCustomer");
const deleteController = require("../controller/customer/deleteCustomer");
const getAllStagesController = require("../controller/customer/getAllStages");
const postStageController = require("../controller/customer/postStage");
const postFollowupController = require("../controller/customer/postFollowup");

router.get("/all", requestHandler(getCustomersController));
router.post("/", requestHandler(postController));
router.put("/:id", requestHandler(putController));
router.delete("/:id", requestHandler(deleteController));
router.get("/stage/all", requestHandler(getAllStagesController));
router.post("/stage", requestHandler(postStageController));
router.post("/followup", requestHandler(postFollowupController));

module.exports = router;
