const router = require("express").Router();

const requestHandler = require("../middleware/requestHandler");

const getAllController = require("../controller/field/getAll");

router.get("/all", requestHandler(getAllController));

module.exports = router;
