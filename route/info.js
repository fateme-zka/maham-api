const router = require("express").Router();

const requestHandler = require("../middleware/requestHandler");

const getInfosController = require("../controller/info/get");

router.get("/all", requestHandler(getInfosController));

module.exports = router;
