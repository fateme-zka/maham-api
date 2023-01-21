const router = require("express").Router();

const requestHandler = require("../middleware/requestHandler");

const getAllController = require("../controller/estate/getAll");
const activeController = require("../controller/estate/active");
const soldController = require("../controller/estate/sold");
const getController = require("../controller/estate/get");
const postController = require("../controller/estate/add");
const updateController = require("../controller/estate/update");
const deleteController = require("../controller/estate/delete");

router.get("/all", requestHandler(getAllController)); // should get filter query
router.get("/active/:id", requestHandler(activeController));
router.get("/sold/:id", requestHandler(soldController));
router.get("/:id", requestHandler(getController));
router.post("/:estate_type/:sale_method/add", requestHandler(postController));
router.put("/update/:id", requestHandler(updateController));
router.delete("/delete/:id", requestHandler(deleteController));

module.exports = router;
