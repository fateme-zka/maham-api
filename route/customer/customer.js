const router = require("express").Router();

const requestHandler = require("../../middleware/requestHandler");

const getAllStagesController = require("../../controller/customer/stage/getAll");
const getAllCustomersController = require("../../controller/customer/customer/getAll");
const getCustomerController = require("../../controller/customer/customer/get");
const postCustomerController = require("../../controller/customer/customer/post");
const postStageController = require("../../controller/customer/stage/post");
const putCustomerController = require("../../controller/customer/customer/put");
const deleteCustomerController = require("../../controller/customer/customer/delete");

router.get("/stage/all", requestHandler(getAllStagesController));
router.get("/all", requestHandler(getAllCustomersController));
router.get("/:id", requestHandler(getCustomerController));
router.post("/", requestHandler(postCustomerController));
router.post("/stage", requestHandler(postStageController));
router.put("/:id", requestHandler(putCustomerController));
router.delete("/:id", requestHandler(deleteCustomerController));

module.exports = router;
