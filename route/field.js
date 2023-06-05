const router = require("express").Router();

const requestHandler = require("../middleware/requestHandler");

const getAllEstatesController = require("../controller/field/getAllEstates");
const getAllSalesController = require("../controller/field/getAllSales");

router.get("/estate/all", requestHandler(getAllEstatesController));
router.get("/sale/all", requestHandler(getAllSalesController));

module.exports = router;
