const router = require("express").Router();

const requestHandler = require("../middleware/requestHandler");

const getAllController = require("../controller/comment/getAll");
const verifyController = require("../controller/comment/verify");
const addController = require("../controller/comment/add");
const deleteController = require("../controller/comment/delete");

router.get("/all/:estate_id", requestHandler(getAllController));
router.get("/verify/:id", requestHandler(verifyController));
router.post("/add", requestHandler(addController));
router.delete("/delete/:id", requestHandler(deleteController));

module.exports = router;
