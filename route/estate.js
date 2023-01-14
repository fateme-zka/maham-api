const router = require("express").Router();

const requestHandler = require("../middleware/requestHandler");

const getAllController = require("../controller/estate/getAll");
const postController = require("../controller/estate/add");
const verifyController = require("../controller/estate/verify");

router.get("/all", requestHandler(getAllController)); // should get query
router.post("/:estate_type/:sale_method/add", requestHandler(postController));
router.get("/verify/:id", requestHandler(verifyController));
// router.put("/update/:id", requestHandler(updateController));
// router.delete("/delete/:id", requestHandler(deleteController));
// router.get("/switch/activation/:id", requestHandler(switchActivationController));

module.exports = router;
