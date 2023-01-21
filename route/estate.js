const router = require("express").Router();

const requestHandler = require("../middleware/requestHandler");

const getAllController = require("../controller/estate/getAll");
const getController = require("../controller/estate/get");
const postController = require("../controller/estate/add");
// const updateController = require("../controller/estate/update");

router.get("/all", requestHandler(getAllController)); // should get filter query
router.get("/:id", requestHandler(getController));
router.post("/:estate_type/:sale_method/add", requestHandler(postController));
// router.put("/update/:id", requestHandler(updateController));
// router.delete("/delete/:id", requestHandler(deleteController));
// router.get("/switch/activation/:id", requestHandler(switchActivationController));

module.exports = router;
