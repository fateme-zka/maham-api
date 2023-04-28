const router = require("express").Router();

const requestHandler = require("../middleware/requestHandler");

const getAllController = require("../controller/advertising/getAll");
const postController = require("../controller/advertising/post");

router.get("/all", requestHandler(getAllController));
router.post("/", requestHandler(postController));

module.exports = router;
