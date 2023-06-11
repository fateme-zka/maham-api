const router = require("express").Router();

const requestHandler = require("../middleware/requestHandler");

const getAllController = require("../controller/meeting/getAll");
const getController = require("../controller/meeting/get");
const postController = require("../controller/meeting/post");
const putController = require("../controller/meeting/put");
const deleteController = require("../controller/meeting/delete");

router.get("/all", requestHandler(getAllController));
router.get("/:id", requestHandler(getController));
router.post("/", requestHandler(postController));
router.put("/:id", requestHandler(putController));
router.delete("/:id", requestHandler(deleteController));

module.exports = router;
