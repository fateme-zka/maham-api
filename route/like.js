const router = require("express").Router();

const requestHandler = require("../middleware/requestHandler");

const likeController = require("../controller/like/put");
const checkController = require("../controller/like/check");
const countController = require("../controller/like/count");

router.put("/estate", requestHandler(likeController));
router.put("/estate/check", requestHandler(checkController));
router.put("/estate/count", requestHandler(countController));

module.exports = router;
