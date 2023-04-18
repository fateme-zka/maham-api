const router = require("express").Router();

const requestHandler = require("../middleware/requestHandler");

const getAllController = require("../controller/estate/getAll");
const userEstatesController = require("../controller/estate/userEstates");
const getAllTypesController = require("../controller/estate/getAllTypes");
const activeController = require("../controller/estate/active");
const soldController = require("../controller/estate/sold");
const getController = require("../controller/estate/get");
const postController = require("../controller/estate/add");
const updateController = require("../controller/estate/update");
const transferController = require("../controller/estate/transfer");
const deleteController = require("../controller/estate/delete");

router.get("/all", requestHandler(getAllController)); // should get filter query
router.get("/all/:user_id", requestHandler(userEstatesController));
router.get("/type/all", requestHandler(getAllTypesController)); // should get filter query
router.get("/active/:id", requestHandler(activeController));
router.get("/sold/:id", requestHandler(soldController));
router.get("/:id", requestHandler(getController));
router.post("/:estate_type/:sale_method/add", requestHandler(postController));
router.put("/update/:id", requestHandler(updateController));
router.put("/transfer/:id", requestHandler(transferController));
router.delete("/delete/:id", requestHandler(deleteController));

module.exports = router;
