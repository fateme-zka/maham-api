const router = require("express").Router();

const requestHandler = require("../middleware/requestHandler");

const getAllStagesController = require("../controller/customer/getAllStages");
const getAllCustomersController = require("../controller/customer/getAllCustomers");
const getCustomerController = require("../controller/customer/getCustomer");
const postCustomerController = require("../controller/customer/postCustomer");
const postStageController = require("../controller/customer/postStage");
const putCustomerController = require("../controller/customer/putCustomer");
const deleteCustomerController = require("../controller/customer/deleteCustomer");

router.get("/stage/all", requestHandler(getAllStagesController));
router.get("/all", requestHandler(getAllCustomersController));
router.get("/:id", requestHandler(getCustomerController));
router.post("/", requestHandler(postCustomerController));
router.post("/stage", requestHandler(postStageController));
router.put("/:id", requestHandler(putCustomerController));
router.delete("/:id", requestHandler(deleteCustomerController));

module.exports = router;
