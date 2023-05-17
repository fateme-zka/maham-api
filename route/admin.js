const router = require("express").Router();

const requestHandler = require("../middleware/requestHandler");

// estate
const verifyEstateController = require("../controller/admin/estate/verify");

// user
const getAllUsersController = require("../controller/admin/user/getAllUsers");
const postUserController = require("../controller/admin/user/postUser");

router.put("/estate/verify/:id", requestHandler(verifyEstateController));

router.get("/user/all", requestHandler(getAllUsersController));
router.post("/user", requestHandler(postUserController));

module.exports = router;
