const router = require("express").Router();

const requestHandler = require("../middleware/requestHandler");

const getAllController = require("../controller/estate/getAll");
const verifyController = require("../controller/estate/verify");
const getController = require("../controller/estate/get");
const postController = require("../controller/estate/add");

router.get("/all", requestHandler(getAllController)); // should get query
router.get("/verify/:id", requestHandler(verifyController));
router.get("/:id", requestHandler(getController));
router.post("/:estate_type/:sale_method/add", requestHandler(postController));
// router.put("/update/:id", requestHandler(updateController));
// router.delete("/delete/:id", requestHandler(deleteController));
// router.get("/switch/activation/:id", requestHandler(switchActivationController));

module.exports = router;
