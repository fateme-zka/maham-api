const router = require("express").Router();

const requestHandler = require("../middleware/requestHandler");

const countController = require("../controller/score/count");
const addController = require("../controller/score/add");

router.get("/count/:estate_id", requestHandler(countController));
router.post("/add", requestHandler(addController));

module.exports = router;
