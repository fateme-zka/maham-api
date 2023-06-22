const router = require("express").Router();

const requestHandler = require("../middleware/requestHandler");

const getAllController = require("../controller/demand/getAll");
const getController = require("../controller/demand/get");
const postController = require("../controller/demand/post");
const putController = require("../controller/demand/put");
const deleteController = require("../controller/demand/delete");

router.get("/all", requestHandler(getAllController));
router.get("/:id", requestHandler(getController));
router.post("/", requestHandler(postController));
router.put("/:id", requestHandler(putController));
router.delete("/:id", requestHandler(deleteController));

module.exports = router;
