const router = require("express").Router();

const requestHandler = require("../middleware/requestHandler");

const getAllController = require("../controller/contact_us/getAll");
const postController = require("../controller/contact_us/post");

router.get("/all", requestHandler(getAllController));
router.post("/", requestHandler(postController));

module.exports = router;
