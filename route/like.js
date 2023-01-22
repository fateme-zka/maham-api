const router = require("express").Router();

const requestHandler = require("../middleware/requestHandler");

const likeController = require("../controller/like/put");
const checkController = require("../controller/like/check");
const countController = require("../controller/like/count");

router.put("/switch", requestHandler(likeController));
router.put("/check", requestHandler(checkController));
router.put("/count", requestHandler(countController));

module.exports = router;
