const router = require("express").Router();

// const requestHandler = require("../middleware/requestHandler");

const getAllController = require("../controller/estate/getAll");

router.get("/all", getAllController.handler);

module.exports = router; 
