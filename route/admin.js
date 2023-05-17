const router = require("express").Router();

const requestHandler = require("../middleware/requestHandler");

// estate
const verifyEstateController = require("../controller/admin/estate/verify");
const transferEstateController = require("../controller/admin/estate/transfer");

// user
const getAllUsersController = require("../controller/admin/user/getAllUsers");
const postUserController = require("../controller/admin/user/postUser");

router.put("/estate/verify/:id", requestHandler(verifyEstateController));
router.put("/estate/transfer/:id", requestHandler(transferEstateController));

router.get("/user/all", requestHandler(getAllUsersController));
router.post("/user", requestHandler(postUserController));

module.exports = router;
