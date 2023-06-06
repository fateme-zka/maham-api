const router = require("express").Router();

const requestHandler = require("../../middleware/requestHandler");

const getAllController = require("../../controller/customer/followup/getAll");
const getController = require("../../controller/customer/followup/get");
const putController = require("../../controller/customer/followup/put");
const postController = require("../../controller/customer/followup/post");

router.get("/all", requestHandler(getAllController));
router.get("/:id", requestHandler(getController));
router.post("/", requestHandler(putController));
router.put("/:id", requestHandler(postController));

module.exports = router;
