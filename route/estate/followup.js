const router = require("express").Router();

const requestHandler = require("../../middleware/requestHandler");

const getAllEstatesController = require("../../controller/estate/followup/getAllEstates");
const getAllCustomersController = require("../../controller/estate/followup/getAllCustomers");
const getAllController = require("../../controller/estate/followup/getAll");
const getController = require("../../controller/estate/followup/get");
const postController = require("../../controller/estate/followup/post");
const putController = require("../../controller/estate/followup/put");
const deleteController = require("../../controller/estate/followup/delete");

router.get("/estate/all", requestHandler(getAllEstatesController));
router.get("/customer/all", requestHandler(getAllCustomersController));
router.get("/all", requestHandler(getAllController));
router.get("/:id", requestHandler(getController));
router.post("/", requestHandler(postController));
router.put("/:id", requestHandler(putController));
router.delete("/:id", requestHandler(deleteController));

module.exports = router;
