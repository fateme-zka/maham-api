const router = require("express").Router();

const requestHandler = require("../middleware/requestHandler");

const getAllController = require("../controller/estate/getAll");

router.get("/all", requestHandler(getAllController));

module.exports = router;
