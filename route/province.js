const router = require("express").Router();

const requestHandler = require("../middleware/requestHandler");

const getAllController = require("../controller/province/getAll");

router.get("/all", requestHandler(getAllController));

module.exports = router;
