const router = require("express").Router();

const requestHandler = require("../middleware/requestHandler");

const verifyController = require("../controller/admin/verifyEstate");
const getAllUsersController = require("../controller/admin/getAllUsers");
const postUserController = require("../controller/admin/postUser");

router.get("/estate/verify/:id", requestHandler(verifyController));
router.get("/user/all", requestHandler(getAllUsersController));
router.post("/user", requestHandler(postUserController));

module.exports = router;
