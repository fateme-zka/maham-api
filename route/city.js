const router = require("express").Router();

const requestHandler = require("../middleware/requestHandler");

const getAllController = require("../controller/city/getAll");

router.get("/all/:province_id", requestHandler(getAllController));

module.exports = router;
