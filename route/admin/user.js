const router = require("express").Router();

const requestHandler = require("../../middleware/requestHandler");

const getAllUsersController = require("../../controller/admin/user/getAllUsers");
const postUserController = require("../../controller/admin/user/postUser");

router.get("/all", requestHandler(getAllUsersController));
router.post("/", requestHandler(postUserController));

module.exports = router;
