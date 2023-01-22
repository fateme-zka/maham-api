const router = require("express").Router();

const requestHandler = require("../middleware/requestHandler");

const switchController = require("../controller/like/switch");
const checkController = require("../controller/like/check");
const countController = require("../controller/like/count");

router.put("/switch", requestHandler(switchController));
router.put("/check", requestHandler(checkController));
router.put("/count", requestHandler(countController));

module.exports = router;
