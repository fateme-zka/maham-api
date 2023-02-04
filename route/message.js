const router = require("express").Router();

const requestHandler = require("../middleware/requestHandler");

const allController = require("../controller/message/all");
const postController = require("../controller/message/post");
const seenController = require("../controller/message/seen");

router.get("/all", requestHandler(allController));
router.post("/add", requestHandler(postController));
router.put("/seen/:id", requestHandler(seenController));

module.exports = router;
