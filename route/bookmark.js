const router = require("express").Router();

const requestHandler = require("../middleware/requestHandler");

const allEstatesController = require("../controller/bookmark/allEstates");
const switchController = require("../controller/bookmark/switch");
const checkController = require("../controller/bookmark/check");

router.get("/estate/all", requestHandler(allEstatesController));
router.put("/switch", requestHandler(switchController));
router.put("/check", requestHandler(checkController));

module.exports = router;
